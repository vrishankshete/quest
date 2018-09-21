var log4js = require('log4js');
var express = require('express');
var app = express();
var http = require('http').Server(app);
const path = require('path');
var io = require('socket.io')(http);
var util = require('util');
var fs = require('fs');
var dir = './logs';
var request = require('request');
var ip = require("ip");

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

log4js.configure({
 appenders: [
   { type: 'console' },
   {
		"type": "dateFile",
		"filename": "logs/quest.log",
		"pattern": "-yyyy-MM-dd",
		"alwaysIncludePattern": false
	}
  ]
});

const errorCodes = {
	NO_QUESTIONS: 1,
	INVALID_ROOM_ID: 2,
	SERVER_FULL: 3
};

let logger = log4js.getLogger('quest');
logger.setLevel('debug');

const PORT = 3000;

let rooms = {};
let users = {};

let config = {
	questionTimeout:10, //Timeout in seconds
	questionsPerSession:5,
	maxUsersPerRoom:2
};

app.use(express.static(path.join(__dirname, 'build')));

function getFormattedQuestions(results){
	return results.map((element, index)=>{
		let options = element.incorrect_answers;
		let ansIndex = Math.floor(Math.random() * (options.length+1));
		options.splice(ansIndex, 0, element.correct_answer);
		options = options.map((entry)=>decodeURIComponent(entry));
		return {
			no: index + 1,
			question: decodeURIComponent(element.question),
			options,
			answer: ansIndex
		};
	});
}

let questions = [];

function getQs(){
	return new Promise(function(resolve, reject) {
		request('https://opentdb.com/api.php?amount=10&encode=url3986', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				let result = JSON.parse(body);
				let formattedQuestions = getFormattedQuestions(result.results);
				questions = questions.concat(formattedQuestions);
				resolve("Got questions");
			}
			else{
				reject(error)
			}
		})
	})
}

getQs().then((msg)=>{console.log(msg)}, (error)=>{console.log(error)});

app.get('/questions', function(req,res){
	res.json(questions);
});

function getRandom(){
	let max=9999, min=1000;
	return Math.floor(Math.random()*(max-min+1)+min);
}

function generateQuizRef(){
	let maxIterations=0;
	let tempQuizRef
	do{
		tempQuizRef = getRandom().toString();
		maxIterations++;
	}while(Object.keys(rooms).indexOf(tempQuizRef)!=-1 && maxIterations<100);

	if(maxIterations>=100){
		return null;
	}
	return tempQuizRef;
}

io.on('connection', function(socket){
	logger.debug("Client Connected. " + socket.id);
	let id = socket.id;
	users[id] = {};
	let quizRef;

	function calculateScore(){
		let users = rooms[quizRef].users;
		let questions = rooms[quizRef].questions;
		let returnScoreObj = {};

		for(var user in users){
			let score = {
				attempted:0,
				correct:0,
				incorrect:0
			}
			for(var qNo in users[user].userAnsMap){
				if (users[user].userAnsMap.hasOwnProperty(qNo)) {
					if(questions[qNo].answer == users[user].userAnsMap[qNo]){
						score.correct = score.correct + 1;
					}
					else{
						score.incorrect = score.incorrect + 1;
					}
				}
				score.attempted = score.attempted + 1;
			}
			returnScoreObj[user] = score;
		}
		logger.debug("***users  :::: ", util.inspect(rooms[quizRef].users, {showHidden: false, depth: null}));
		return returnScoreObj;
	}

	function startQuiz(quizRef){
		try{
			if(rooms[quizRef].questions.length < 10){
				io.to(users[id].quizRef).emit('app error', {code:errorCodes.NO_QUESTIONS});
				return;
			}
			io.to(users[id].quizRef).emit('quiz started');
			let questionNumber=0;
			io.to(users[id].quizRef).emit('question',{questionNumber, question:rooms[quizRef].questions[questionNumber++]});
			logger.info('Sent first question');
			let questionTimer = setInterval(()=>{
				try{
					if(questionNumber>=config.questionsPerSession){
						clearInterval(questionTimer);
						let scoreObj = calculateScore();
						io.to(users[id].quizRef).emit('end quiz', scoreObj);
					}
					else{
						io.to(users[id].quizRef).emit('question',{questionNumber, question:rooms[quizRef].questions[questionNumber++]});
						logger.info('Sent question: ', questionNumber);
					}
				}
				catch(e){
					logger.info(`Error in questionTimer ${e}`);
					clearInterval(questionTimer);
				}
			}, config.questionTimeout*1000);
		}
		catch(e){
			logger.info(`Error in startQuiz ${e}`);
		}
	}
	socket.on('create room', function(){
		try{
			quizRef = generateQuizRef();
			if(!quizRef){
				socket.emit('app error', {code:errorCodes.SERVER_FULL});
				logger.info('Maximum tries to find room reached');
				return;
			}
			logger.info(`Created room number: ${quizRef}`);
			rooms[quizRef] = {};
			rooms[quizRef].users = {};
			rooms[quizRef].questions = questions;

			socket.emit('room created', quizRef);

			users[id].quizRef = quizRef;
			if(rooms[quizRef]){
				rooms[quizRef].users[id] = {userAnsMap:{}};
				logger.debug("***USERS: ", util.inspect(users, {showHidden: false, depth: null}));
				logger.debug("***ROOMS: ", util.inspect(Object.keys(rooms).map(quizRef=>{
					return {quizRef, participants: Object.keys(rooms[quizRef].users)}
				}), {showHidden: false, depth: null}));

				socket.join(users[id].quizRef);
			}
			//TODO: Temp code. To be removed
			setTimeout(()=>startQuiz(quizRef), 3000);
		}
		catch(e){
			logger.info(`Error in Create Room ${e}`);
		}
	});

	socket.on('join room', function(quizRefNo){
		try{
			quizRef = quizRefNo;
			if(rooms[quizRef] && Object.keys(rooms[quizRef].users).length < config.maxUsersPerRoom){
				users[id].quizRef = quizRef;
				rooms[quizRef].users[id] = {userAnsMap:{}};
				
				socket.join(users[id].quizRef);
				if(Object.keys(rooms[quizRef].users).length == config.maxUsersPerRoom){
					startQuiz(quizRef);
				}
			}
			else{
				socket.emit('app error', {code:errorCodes.INVALID_ROOM_ID});
			}
		}
		catch(e){
			logger.info(`Error in Join Room ${e}`);
		}
	});

	socket.on('getQ', function(){
		io.emit("questions", questions);
	});

	socket.on('answer', function(userAnswer){
		try{
			rooms[quizRef].users[id].userAnsMap[userAnswer.questionNumber] = userAnswer.answer;
		}
		catch(e){
			logger.info(`Error in answer ${e}`);
		}
	});

	socket.on('submit name', function(name){
	});

	socket.on('logout', ()=>logger.debug("LOGOUT::: ", id));

	socket.on('disconnect', function(){
		try{
			logger.info(`User disconnected: ${id}`);

			if(!users[id]){
				logger.info(`Disconnecting silently: ${id}`);
				return;
			}
			let roomId = users[id].quizRef;
			if(!roomId){
				delete users[id];
			}
			if(rooms[roomId] === undefined){
				logger.debug("Room does not exist");
				return;
			}
			delete rooms[roomId].users[id];

			if(rooms[roomId] && Object.keys(rooms[roomId].users).length === 0){
				//No user left in this room. Delete it.
				delete rooms[roomId];
			}
			delete users[id];
			socket.leave(roomId);
			logger.debug("***USERS: " + util.inspect(users));
			logger.debug("***ROOMS: " + util.inspect(rooms));
		}
		catch(e){
			logger.info(`Error in disconnect ${e}`);
		}
	});
});

http.listen(PORT, function(){
	logger.info(`URL: http://${ip.address()}:${PORT}/`);
});
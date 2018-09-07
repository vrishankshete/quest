var log4js = require('log4js');
var express = require('express');
var app = express();
var http = require('http').Server(app);
const path = require('path');
var io = require('socket.io')(http);
var util = require('util');
var moment = require('moment');
var fs = require('fs');
var dir = './logs';
var request = require('request');
var ip = require("ip");
var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    console.log(`you entered: [${d.toString().trim()}]`);
	io.emit("sms", d.toString().trim());
  });

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

let errorCodes = {
	NO_QUESTIONS: 1,
	INVALID_ROOM_ID: 2
};

var logger = log4js.getLogger('quest');
logger.setLevel('debug');

const HOST = 'localhost';
const PORT = 3000;

var rooms = {};
var users = {};
var sidUnameMap = {};

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
	request('https://opentdb.com/api.php?amount=10&encode=url3986', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let result = JSON.parse(body);
			let formattedQuestions = getFormattedQuestions(result.results);
			questions = questions.concat(formattedQuestions);
		}
	})

	request('https://opentdb.com/api.php?amount=10&encode=url3986', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let result = JSON.parse(body);
			let formattedQuestions = getFormattedQuestions(result.results);
			questions = questions.concat(formattedQuestions);
		}
	})
}

getQs();

app.get('/questions', function(req,res){
	res.json(questions);
});

function getRandom(){
	let max=9999, min=1000;
	return Math.floor(Math.random()*(max-min+1)+min);
}

io.on('connection', function(socket){
	logger.debug("Client Connected. " + socket.id);
	let id = socket.id;
	users[id] = {};
	sidUnameMap[id] = null;

	socket.on('create room', function(){
		let quizRef = getRandom().toString();
		logger.info("Random : "+quizRef);
		rooms[quizRef] = {};
		rooms[quizRef].users = [];
		rooms[quizRef].questions = questions;

		socket.emit('room created', quizRef);

		users[id].quizRef = quizRef;
		if(rooms[quizRef]){
			rooms[quizRef].users.push(id);
			logger.debug("\n***USERS: ", util.inspect(users, {showHidden: false, depth: null}));
			logger.debug("\n***ROOMS: ", util.inspect(rooms, {showHidden: false, depth: null}));
			socket.join(users[id].quizRef);
		}
		//TODO: Temp code. To be removed
		//setTimeout(()=>startQuiz(quizRef), 3000);
	});

	function startQuiz(quizRef){
		if(rooms[quizRef].questions.length < 10){
			io.to(users[id].quizRef).emit('error', {code:errorCodes.NO_QUESTIONS});
			return;
		}
		io.to(users[id].quizRef).emit('quiz started');
		let questionNumber=0;
		io.to(users[id].quizRef).emit('question',{questionNumber, question:rooms[quizRef].questions[questionNumber++]});
		logger.info('Sent first question');
		let questionTimer = setInterval(()=>{
			io.to(users[id].quizRef).emit('question',{questionNumber, question:rooms[quizRef].questions[questionNumber++]});
			logger.info('Sent question: ', questionNumber);
			if(questionNumber>=9){
				clearInterval(questionTimer);
				io.to(users[id].quizRef).emit('end quiz');
			}
		},10000);
	}

	socket.on('join room', function(quizRef){
		if(rooms[quizRef]){
			users[id].quizRef = quizRef;
			rooms[quizRef].users.push(id);
			if(rooms[quizRef].users.length == 2){
				socket.join(users[id].quizRef);
				startQuiz(quizRef);
			}
		}
		else{
			socket.emit('error', {code:errorCodes.INVALID_ROOM_ID});
		}
	});

	socket.on('getQ', function(){
		io.emit("questions", questions);
	});

	socket.on('submit name', function(name){
	});

	socket.on('disconnect', function(){
		logger.debug("Disconnected");
	});
});

http.listen(PORT, function(){
	logger.info(`URL: http://${ip.address()}:${PORT}/`);
});
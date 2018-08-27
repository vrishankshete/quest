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

var logger = log4js.getLogger('quest');
logger.setLevel('debug');

const HOST = 'localhost';
const PORT = 3000;

var rooms = {};
var users = {};
var groups = {};
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

function getReq(){
	request('https://opentdb.com/api.php?amount=50&encode=url3986', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		let result = JSON.parse(body);
		logger.debug(result.results);
		let questions = getFormattedQuestions(result.results);
		logger.debug(questions);
		io.emit("questions", {questions});
	}
  })
}

io.on('connection', function(socket){
	logger.debug("Client Connected. " + socket.id);
	var id = socket.id;
	users[id] = {};
	sidUnameMap[id] = null;

	getReq();

	socket.on('room id', function(msg){
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
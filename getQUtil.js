var fs = require('fs');
var dir = './data/ugly';
var request = require('request');

/*
*	Request token: https://opentdb.com/api_token.php?command=request
*	Reset token: https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE
*	Categories Lookup: https://opentdb.com/api_category.php
*	Question count in a category lookup: https://opentdb.com/api_count.php?category=CATEGORY_ID_HERE
*	Global question count lookup: https://opentdb.com/api_count_global.php
*/

let token='5d829cf57508fc9da913af4233cebf18f0b041f523aece3758caa7c0399d70f0';

categories = {9:"General Knowledge",10:"Entertainment_Books",11:"Entertainment_Film",12:"Entertainment_Music",
	13:"Entertainment_Musicals & Theatres",14:"Entertainment_Television",15:"Entertainment_Video Games",
	16:"Entertainment_Board Games",17:"Science & Nature",18:"Science_Computers",19:"Science_Mathematics",
	20:"Mythology",21:"Sports",22:"Geography",23:"History",24:"Politics",25:"Art",26:"Celebrities",
	27:"Animals",28:"Vehicles",29:"Entertainment_Comics",30:"Science_Gadgets",
	31:"Entertainment_Japanese Anime & Manga",32:"Entertainment_Cartoon & Animations",
	33:"Random"};

let question_amount=50;   //Total questions = question_amount * no_of_requests
let no_of_requests=25;
getQs(33);

function getFormattedQuestions(results,questionCounter){
	return results.map((element, index)=>{
		let options = element.incorrect_answers;
		let ansIndex = Math.floor(Math.random() * (options.length+1));
		options.splice(ansIndex, 0, element.correct_answer);
		options = options.map((entry)=>decodeURIComponent(entry));
		return {
			no: questionCounter + index + 1,
			question: decodeURIComponent(element.question),
			options,
			answer: ansIndex
		};
	});
}

let questions=[];
let counter = 0;

function getQs(category_id){
	request(`https://opentdb.com/api.php?amount=${question_amount}&encode=url3986&token=${token}`,
	function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let result = JSON.parse(body);
			switch(result.response_code){
				case 0:
					let formattedQuestions = getFormattedQuestions(result.results, questions.length);
					questions = questions.concat(formattedQuestions);
					counter++;
					console.log(`Got chunk: ${counter}`);
					if(counter<no_of_requests){
						getQs(category_id);
					}
					else{
						fs.writeFileSync(`${dir}/${categories[category_id]}.json`, JSON.stringify(questions, null, 2), 'utf-8');
					}
				break;

				case 1:
					console.log('No Enough Questions as requested');
				break;

				case 2:
					console.log('Invalid Parameter');
				break;

				case 3:
					console.log('Session Token Not Found');
				break;

				case 4:
					console.log('Session Token has returned all possible questions for the specified query. Resetting the Token is necessary');
					fs.writeFileSync(`${dir}/${categories[category_id]}.json`, JSON.stringify(questions, null, 2), 'utf-8');
				break;

				default:
					console.log('API is out of ques or error');
					break;
			}
		}
		else{
			console.log('Request error');
		}
	})
}

//getQs();

// getQs().then((msg)=>{
// 	console.log(msg);
// }, (error)=>{console.log(error)});
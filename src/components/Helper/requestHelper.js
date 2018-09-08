
export const getFormattedQuestions = (results) => {
	return results.map((element, index)=>{
		let options = element.incorrect_answers;
		let ansIndex = Math.floor(Math.random() * (options.length+1));
		options.splice(ansIndex, 0, element.correct_answer);
		options = options.map((entry)=>decodeURIComponent(entry));
		return {
			questionNumber: index,
			question: decodeURIComponent(element.question),
			options,
			answer: ansIndex
		};
	});
}
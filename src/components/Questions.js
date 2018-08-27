import React from 'react';
import io from 'socket.io-client';
import Question from './Question';

let socket = io("http://192.168.43.170:3000");

export default class Questions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      question:"",
      options:[],
      answer:-1
    }
    this.currentQuestion = 0;
    this.questions = [];
  }

  nextQuestion(){
    if(this.questions && this.questions.length>0){
      let q = this.questions[this.currentQuestion++];
      
      this.setState({
        question: q.question,
        options: q.options,
        answer: q.answer
      });
    }
  }

  componentDidMount(){
    socket.on("questions", (data)=>{
      this.questions = data.questions;
      this.nextQuestion();
    });
  }

  render() {
    if(this.questions.length > 0){
    return (
      <Question question={this.state.question}
        options={this.state.options}
        answer={this.state.answer}
        nextQuestion={this.nextQuestion.bind(this)}
      />
    );}
    return null;
  }
}
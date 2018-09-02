import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, CheckBox, Button, ActivityIndicator} from 'react-native';
import Loading from '../Loading/Loading';
//import io from 'socket.io-client';
import Question from '../Question/Question';
import * as actionCreator from './actions';
import * as loadingActionCreator from '../Loading/actions';
import {resetScoreAction} from '../Results/actions';
//let socket = io("http://192.168.43.170:3000");

class Questions extends React.Component {
  constructor(props){
    super(props);
    this.currentQuestion = 1;
  }

  nextQuestion(){
    let q = this.props.questions[this.currentQuestion++];
    if(q){
      this.props.setQuestion({
        question: q.question,
        options: q.options,
        answer: q.answer
      });
    }
    else{
      this.props.navigation.navigate('Results');
    }
  }

  componentDidMount(){
    this.props.getQuestions();
    this.props.resetScore();
    // socket.on("questions", (questions)=>{
    //   this.props.setQuestions(questions);
    //   this.nextQuestion();
    // });
    // if(this.props.questions.length<=0)
    // socket.emit("getQ");
  }

  render() {
    return (
      <View style={styles.container}>
           <Question nextQuestion={this.nextQuestion.bind(this)}/>
           <Loading/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

const mapStateToProps = (rootState) => {
  return {
    questions: rootState.questions.get('questions')
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    setQuestions: (questions) => dispatch(actionCreator.setQuestions(questions)),
    setQuestion: (questionObj) => dispatch(actionCreator.setQuestion(questionObj)),
    getQuestions: ()=> dispatch(actionCreator.getQuestions()),
    stopLoading: ()=> dispatch(loadingActionCreator.hideLoadingAction()),
    resetScore: ()=> dispatch(resetScoreAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
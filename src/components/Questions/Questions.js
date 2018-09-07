import React from 'react';
import { connect } from 'react-redux';
import { View, BackHandler } from 'react-native';
import Loading from '../Loading/Loading';
import Question from '../Question/Question';
import * as actionCreator from './actions';
import * as loadingActionCreator from '../Loading/actions';
import { resetScoreAction } from '../Results/actions';
import { styles } from '../../styles/styles';

class Questions extends React.Component {
  constructor(props){
    super(props);
    this.currentQuestion = 1;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', ()=>{this.props.navigation.navigate('Home');return true;});
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  static navigationOptions = {
    title: 'Single Player Game !!!',
};

  nextQuestion(){
    let q = this.props.questions[this.currentQuestion++];
    if(q){
      this.props.setQuestion({
        questionNumber:this.currentQuestion,
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
  }

  render() {
    return (
      <View style={styles.questionContainer}>
           <Question nextQuestion={this.nextQuestion.bind(this)}/>
           <Loading/>
      </View>
    )
  }
}

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
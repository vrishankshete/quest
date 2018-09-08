import React from 'react';
import { connect } from 'react-redux';
import { View, BackHandler, TouchableOpacity, Text } from 'react-native';
import Loading from '../Loading/Loading';
import Question from '../Question/Question';
import * as actionCreator from './actions';
import { correctAnswerAction, incorrectAnswerAction } from '../Results/actions';
import { resetScoreAction } from '../Results/actions';
import { styles } from '../../styles/styles';

class Questions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentQuestion: {questionNumber: -1,
        question: '',
        options: [],
        answer: -1
      },
      backgroundColor: 'white'
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.questions.length === 0 && nextProps.questions.length > 0){
      this.setState({currentQuestion: nextProps.questions[0]});
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', ()=>{this.props.navigation.navigate('Home');return true;});
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  static navigationOptions = {
    title: 'Single Player Game !!!',
    headerLeft: null,
  };

  submitAnswer(selectedOption){
    if(this.state.currentQuestion.answer == selectedOption){
      this.props.correctAnswer();
    }
    else{
      this.props.incorrectAnswer();
    }
  }

  nextQuestion(){
    let cQuestion = this.props.questions[this.state.currentQuestion.questionNumber+1];
    if(cQuestion){
      this.setState({currentQuestion:cQuestion, backgroundColor:'white'});
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
        <Question
          question={this.state.currentQuestion}
          backgroundColor={this.state.backgroundColor}
          submitAnswer={(selectedOption)=>this.submitAnswer(selectedOption)}
        />
        <TouchableOpacity style={styles.questionButton} onPress={()=>this.nextQuestion()}>
          <Text style={{textAlign:'center'}}>Next Question</Text>
        </TouchableOpacity>
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
    //setQuestions: (questions) => dispatch(actionCreator.setQuestions(questions)),
    //setQuestion: (questionObj) => dispatch(actionCreator.setQuestion(questionObj)),
    getQuestions: ()=> dispatch(actionCreator.getQuestions()),
    resetScore: ()=> dispatch(resetScoreAction()),
    correctAnswer: () => dispatch(correctAnswerAction()),
    incorrectAnswer: () => dispatch(incorrectAnswerAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
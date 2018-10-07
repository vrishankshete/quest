import React from 'react';
import { connect } from 'react-redux';
import { View, BackHandler, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo';
import Loading from '../Loading/Loading';
import Question from '../Question/Question';
import { getQuestions, resetQuestions } from './actions';
import { correctAnswerAction, incorrectAnswerAction } from '../Results/actions';
import { resetScoreAction } from '../Results/actions';
import { stageStyles, gradientColors } from '../../styles/styles';
import { singlePlayerQNos } from '../../config/config';

class Questions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentQuestion: {questionNumber: -1,
        question: 'Q',
        options: [],
        answer: -1
      },
      backgroundColor: 'white',
      showAnswer: false
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.questions.length === 0 && nextProps.questions.length > 0){
      this.setState({currentQuestion: nextProps.questions[0]});
    }
  }

  componentDidMount() {
    this.props.getQuestions();
    this.props.resetScore();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{this.props.navigation.navigate('Home');this.backHandler.remove();return true;});
  }

  componentWillUnmount() {
    this.props.resetQuestions();
  }

  static navigationOptions = {
    title: 'Single Player Game !!!',
    header: null,
  };

  submitAnswer(selectedOption){
    if(this.state.currentQuestion.answer == selectedOption){
      this.props.correctAnswer();
    }
    else{
      this.props.incorrectAnswer();
    }
    this.setState({showAnswer:true});
  }

  nextQuestion(){
    let cQuestion = this.props.questions[this.state.currentQuestion.questionNumber+1];
    if(cQuestion){
      this.setState({currentQuestion:cQuestion, backgroundColor:'white', showAnswer:false});
    }
    else{
      this.props.navigation.navigate('Results');
    }
  }

  render() {
    return (
      <LinearGradient colors={gradientColors} style={stageStyles.container}>
        <Question
          question={this.state.currentQuestion}
          submitAnswer={(selectedOption)=>this.submitAnswer(selectedOption)}
          showAnswer={this.state.showAnswer}
          isMultiplayer={false}
          totalQuestions={singlePlayerQNos}
        />
        <View style={stageStyles.nextButtonContainer}>
          <TouchableOpacity style={stageStyles.nextButton} onPress={()=>this.nextQuestion()}>
            <Text style={stageStyles.nextButtonText}>
              {this.state.currentQuestion.questionNumber == singlePlayerQNos-1?'Show Results':'Next Question'}
            </Text>
          </TouchableOpacity>
        </View>
        <Loading/>
      </LinearGradient>
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
    getQuestions: ()=> dispatch(getQuestions()),
    resetScore: ()=> dispatch(resetScoreAction()),
    correctAnswer: () => dispatch(correctAnswerAction()),
    incorrectAnswer: () => dispatch(incorrectAnswerAction()),
    resetQuestions: () => dispatch(resetQuestions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
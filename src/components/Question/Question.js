import React from 'react';
import { Text, View, CheckBox, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreator from './actions';
import { actionTypes as resultActions, correctAnswerAction, incorrectAnswerAction } from '../Results/actions';
import { styles } from '../../styles/styles';

class Question extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      backgroundColor:'white'
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.qNo){

    }
  }

  toggleOptions(index){
    this.props.changeOption(index);
  }

  nextQuestion(){
    this.setState({backgroundColor:'white'});
    this.props.nextQuestion();
  }

  submitAnswer(){
    if((this.props.selectedOption) == this.props.answer){
      this.props.correctAnswer();
      this.setState({backgroundColor:'green'});
    }
    else{
      this.props.incorrectAnswer();
      this.setState({backgroundColor:'orange'});
    }
  }

  render() {
    let {questionNumber, question, options, selectedOption, answer} = this.props;
    return (
      <View style={[styles.questionContainer, {backgroundColor:this.state.backgroundColor}]}>
        <Text style={{ marginLeft:20 }} selectable={true}>{`Q.${questionNumber} ${question}`}</Text>

        {options.map((option, index)=>{return(
          <View key={index} style={styles.options}>
            <CheckBox
              value={selectedOption === index}
              onValueChange={() => this.toggleOptions(index)}
            />
            <Text style={{marginTop: 5}} onPress={()=>this.toggleOptions(index)}>{option}</Text>
          </View>)
        })}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.questionButton} onPress={()=>this.submitAnswer()}>
            <Text style={{textAlign:'center'}}>Submit Answer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.questionButton} onPress={()=>this.nextQuestion()}>
            <Text style={{textAlign:'center'}}>Next Question</Text>
          </TouchableOpacity>
        </View>

        <Text style={{marginTop: 10,  marginLeft:20 }}>ANSWER: {answer}</Text>
      </View>
    );
  }
}

const mapStateToProps = (rootState) => {
  return {
    selectedOption: rootState.question.get('selectedOption'),
    questionNumber: rootState.question.get('questionNumber'),
    question: rootState.question.get('question'),
    options: rootState.question.get('options'),
    answer: rootState.question.get('answer')
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    changeOption: (selectedOption) => dispatch(actionCreator.optionChanged(selectedOption)),
    correctAnswer: () => dispatch(correctAnswerAction()),
    incorrectAnswer: () => dispatch(incorrectAnswerAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
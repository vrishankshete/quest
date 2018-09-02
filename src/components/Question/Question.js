import React from 'react';
import { StyleSheet, Text, View, CheckBox, Button, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import * as actionCreator from './actions';
import {actionTypes as resultActions, correctAnswerAction, incorrectAnswerAction} from '../Results/actions';

class Question extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      backgroundColor:'white'
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
    return (
      <View style={{
        flex:1,
        flexDirection: 'column',
        backgroundColor: this.state.backgroundColor,
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
        <Text style={{ marginLeft:20 }} selectable={true}>{'Q. '}{this.props.question}</Text>

        {this.props.options.map((option, index)=>{return(
          <View key={index} style={{ flexDirection: 'row', marginLeft:20 }}>
            <CheckBox
              value={this.props.selectedOption === index}
              onValueChange={() => this.toggleOptions(index)}
            />
            <Text style={{marginTop: 5}} onPress={()=>this.toggleOptions(index)}>{option}</Text>
          </View>)
        })}

        <View style={{ flexDirection: 'column', marginLeft:20 }}>
          <TouchableOpacity style={{margin:10, width:110, height:30, justifyContent:'center', backgroundColor: '#DDDDDD',}} onPress={()=>this.submitAnswer()}>
            <Text style={{textAlign:'center'}}>Submit Answer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{margin:10, width:110, height:30, justifyContent:'center', backgroundColor: '#DDDDDD',}} onPress={()=>this.nextQuestion()}>
            <Text style={{textAlign:'center'}}>Next Question</Text>
          </TouchableOpacity>
        </View>

        <Text style={{marginTop: 10,  marginLeft:20 }}>ANSWER: {this.props.answer}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'green',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 50,
  },
});

const mapStateToProps = (rootState) => {
  return {
    selectedOption: rootState.question.get('selectedOption'),
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
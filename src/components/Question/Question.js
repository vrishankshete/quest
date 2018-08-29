import React from 'react';
import { StyleSheet, Text, View, CheckBox, Button } from 'react-native';
import {connect} from 'react-redux';
import * as actionCreator from './actions';

class Question extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      backgroundColor:'yellow'
    }
  }

  toggleOptions(index){
    this.props.changeOption(index);
  }

  nextQuestion(){
    this.setState({backgroundColor:'yellow'});
    this.props.nextQuestion();
  }

  submitAnswer(){
    if((this.props.selectedOption) == this.props.answer){
      this.setState({backgroundColor:'green'});
    }
    else{
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
        <Text selectable={true}>{'Q. '}{this.props.question}</Text>

          {this.props.options.map((option, index)=>{return(
            <View key={index} style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.props.selectedOption === index}
              onValueChange={() => this.toggleOptions(index)}
            />
            <Text style={{marginTop: 5}} onPress={()=>this.toggleOptions(index)}>{option}</Text>
           </View>)
          })}

          <Button
            onPress={()=>this.submitAnswer()}
            title="Submit Answer"
            color="#841584"
          />

          <Button
            onPress={()=>this.nextQuestion()}
            title="Next Question"
            color="#841584"
          />

          <Text style={{marginTop: 5}}>ANSWER: {this.props.answer}</Text>
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
    changeOption: (selectedOption) => dispatch(actionCreator.optionChanged(selectedOption))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
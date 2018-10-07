import React from 'react';
import { Text, View, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import { stageStyles } from '../../styles/styles';
import {CheckBox} from 'react-native-elements';

export default class Question extends React.Component {
  constructor(props){
    super(props);
    this.timer=null;
    this.state= {
      selectedOption:-1,
      timerProgress:0,
      questionProgress:0,
      questionCounter:0
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.question.questionNumber != nextProps.question.questionNumber){
      this.setState({selectedOption:-1,
        timerProgress:0,
        questionProgress:this.state.questionProgress+(1/this.props.totalQuestions),
        questionCounter:this.state.questionCounter+1
      });

      if(this.props.isMultiplayer){
        if(this.timer){
          clearInterval(this.timer);
        }
        this.timer = setInterval(()=>{
          this.setState({timerProgress:this.state.timerProgress+0.1});
        }, 1000);
      }
    }
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }

  toggleOptions(index){
    this.setState({selectedOption: index});
  }

  submitAnswer(){
    this.props.submitAnswer(this.state.selectedOption);
  }

  render() {
    let {question, options, answer} = this.props.question;
    let {showAnswer, opponentAnswer} = this.props;
    return (
      <View style={stageStyles.innerContainer}>
        <View style={stageStyles.progressContainer}>
          <ProgressBarAndroid 
              color='white'
              styleAttr='Horizontal'
              indeterminate={false}
              progress={this.state.questionProgress}
          />
          {this.props.isMultiplayer && <ProgressBarAndroid
            color='white'
            styleAttr="Horizontal"
            indeterminate={false}
            progress={this.state.timerProgress}
          />}
        </View>
        
        <View style={stageStyles.questionContainer}>
          <Text style={stageStyles.questionText}>{`Q.${this.state.questionCounter} ${question}`}</Text>
          {options.map((option, index)=>{
            let ansBackground = {backgroundColor: 'transparent'};
            if(showAnswer){
              if(answer==opponentAnswer && answer==index){
                ansBackground = {backgroundColor: '#124213', opacity:0.5}
              }
              else if(answer==index){
                ansBackground = {backgroundColor: 'green', opacity:0.5}
              }
              else if(opponentAnswer==index){
                ansBackground = {backgroundColor: 'grey', opacity:0.5}
              }
            }
            
            return(
            <View key={index}
                  pointerEvents={this.props.showAnswer?'none':'auto'}>
              <CheckBox
                checkedColor='white'
                textStyle={stageStyles.optionText}
                containerStyle={[{borderColor:'transparent'}, {...ansBackground}]}
                title={`${index+1}. ${option}`}
                checked={this.state.selectedOption === index}
                onPress={() => this.toggleOptions(index)}
              />
            </View>)
          })}
        </View>

        <View style={stageStyles.optionsContainer}>
          {options.map((option, index)=>{return(
            <View key={index}
                  pointerEvents={this.props.showAnswer?'none':'auto'}>
              <CheckBox 
                checkedColor='white'
                textStyle={stageStyles.optionText}
                containerStyle={stageStyles.optionContainer}
                title={`${index+1}`}
                checked={this.state.selectedOption === index}
                onPress={() => this.toggleOptions(index)}
              />
            </View>)
          })}
        </View>
        <View style={stageStyles.ansButtonContainer}>
          <TouchableOpacity style={stageStyles.ansButton} disabled={this.props.showAnswer} onPress={()=>this.submitAnswer()}>
            <Text style={stageStyles.nextButtonText}>Submit Answer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
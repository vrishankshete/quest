import React from 'react';
import { Text, View, CheckBox, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import { styles } from '../../styles/styles';

export default class Question extends React.Component {
  constructor(props){
    super(props);
    this.timer=null;
    this.state= {
      selectedOption:-1,
      backgroundColor:'white',
      progress:0
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.question.questionNumber != nextProps.question.questionNumber){
      this.setState({selectedOption:-1, backgroundColor:'white', progress:0});
      if(this.timer){
        clearInterval(this.timer);
      }
      this.timer = setInterval(()=>{
        this.setState({progress:this.state.progress+0.1});
      }, 1000);
    }
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }

  toggleOptions(index){
    this.setState({selectedOption: index});
  }

  submitAnswer(){
    this.props.question.answer==this.state.selectedOption ?
      this.setState({backgroundColor:'green'}) : 
      this.setState({backgroundColor:'orange'});

    this.props.submitAnswer(this.state.selectedOption);
  }

  render() {
    let {questionNumber, question, options, answer} = this.props.question;
    
    return (
      <View style={[styles.questionContainer, {backgroundColor:this.state.backgroundColor}]}>
        {this.props.isMultiplayer && <ProgressBarAndroid style={{width:'100%'}}
          styleAttr="Horizontal"
          indeterminate={false}
          progress={this.state.progress}
        />}
        <Text style={{ marginLeft:20 }} selectable={true}>{`Q.${questionNumber+1} ${question}`}</Text>

        {options.map((option, index)=>{return(
          <View key={index} 
                style={styles.options} 
                pointerEvents={!this.props.isMultiplayer && this.props.showAnswer?'none':'auto'}>
            <CheckBox
              value={this.state.selectedOption === index}
              onValueChange={() => this.toggleOptions(index)}
            />
            <Text style={{marginTop: 5}} onPress={()=>this.toggleOptions(index)}>{option}</Text>
          </View>)
        })}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.questionButton} disabled={!this.props.isMultiplayer && this.props.showAnswer} onPress={()=>this.submitAnswer()}>
            <Text style={{textAlign:'center'}}>Submit Answer</Text>
          </TouchableOpacity>
        </View>

        {this.props.showAnswer && <Text style={{marginTop: 10,  marginLeft:20 }}>ANSWER: {answer}</Text>}
      </View>
    );
  }
}
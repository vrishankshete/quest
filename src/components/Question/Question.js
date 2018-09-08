import React from 'react';
import { Text, View, CheckBox, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';

export default class Question extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      selectedOption:-1,
      backgroundColor:'white'
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.question.questionNumber != nextProps.question.questionNumber){
      this.setState({selectedOption:-1, backgroundColor:'white'});
    }
  }

  toggleOptions(index){
    this.setState({selectedOption: index});
  }

  submitAnswer(){
    this.props.question.answer==this.state.selectedOption ?
      this.setState({backgroundColor:'green'}) : 
      this.setState({backgroundColor:'orange'});

    this.props.submitAnswer(this.state.selectedOption);
    // if((this.props.selectedOption) == this.props.answer){
    //   this.props.correctAnswer();
    //   this.setState({backgroundColor:'green'});
    // }
    // else{
    //   this.props.incorrectAnswer();
    //   this.setState({backgroundColor:'orange'});
    // }
  }

  render() {
    let {questionNumber, question, options, answer} = this.props.question;
    
    return (
      <View style={[styles.questionContainer, {backgroundColor:this.state.backgroundColor}]}>
        <Text style={{ marginLeft:20 }} selectable={true}>{`Q.${questionNumber} ${question}`}</Text>

        {options.map((option, index)=>{return(
          <View key={index} style={styles.options}>
            <CheckBox
              value={this.state.selectedOption === index}
              onValueChange={() => this.toggleOptions(index)}
            />
            <Text style={{marginTop: 5}} onPress={()=>this.toggleOptions(index)}>{option}</Text>
          </View>)
        })}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.questionButton} onPress={()=>this.submitAnswer()}>
            <Text style={{textAlign:'center'}}>Submit Answer</Text>
          </TouchableOpacity>
        </View>

        <Text style={{marginTop: 10,  marginLeft:20 }}>ANSWER: {answer}</Text>
      </View>
    );
  }
}
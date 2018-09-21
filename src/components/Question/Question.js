import React from 'react';
import { Text, View, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import { styles } from '../../styles/styles';
import { LinearGradient } from 'expo';
import {CheckBox} from 'react-native-elements';

export default class Question extends React.Component {
  constructor(props){
    super(props);
    this.timer=null;
    this.state= {
      selectedOption:-1,
      backgroundColor:'white',
      timerProgress:0,
      questionProgress:0
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.question.questionNumber != nextProps.question.questionNumber){
      this.setState({selectedOption:-1, 
        backgroundColor:'white',
        timerProgress:0,
        questionProgress:this.state.questionProgress+0.2
      });
      if(this.timer){
        clearInterval(this.timer);
      }
      this.timer = setInterval(()=>{
        this.setState({timerProgress:this.state.timerProgress+0.1});
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
      <LinearGradient colors={['#000000', '#030184']}
        style={[styles.questionContainer, { padding: 15, alignItems: 'flex-start', borderRadius: 10 }]}>
      <ProgressBarAndroid style={{width:'100%', alignSelf:'flex-start'}}
          styleAttr="Horizontal"
          indeterminate={false}
          progress={this.state.questionProgress}
      />
      <View style={[styles.questionContainer,{backgroundColor:'transparent'}]}>
        {this.props.isMultiplayer && <ProgressBarAndroid style={{width:'100%'}}
          styleAttr="Horizontal"
          indeterminate={false}
          progress={this.state.timerProgress}
        />}
        <Text style={{ marginLeft:20, color:'white', fontSize:18 }} selectable={true}>{`Q.${questionNumber+1} ${question}`}</Text>

        {options.map((option, index)=>{return(
          <View key={index} 
                style={styles.options} 
                pointerEvents={!this.props.isMultiplayer && this.props.showAnswer?'none':'auto'}>
            <CheckBox 
              textStyle={{color: 'white', fontSize:16, fontWeight:'normal'}}
              containerStyle={{backgroundColor: 'transparent', borderColor:'transparent'}}
              title={option}
              checked={this.state.selectedOption === index}
              onPress={() => this.toggleOptions(index)}
            />
            {/* <Text style={{marginTop: 5, color:'white'}} onPress={()=>this.toggleOptions(index)}>{option}</Text> */}
          </View>)
        })}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.questionButton} disabled={!this.props.isMultiplayer && this.props.showAnswer} onPress={()=>this.submitAnswer()}>
            <Text style={{textAlign:'center', color:'white'}}>Submit Answer</Text>
          </TouchableOpacity>
        </View>
        {this.props.showAnswer ? <Text style={{marginTop: 10,  marginLeft:23, color:'white' }}>Answer: {options[answer]}</Text>:<Text>{" "}</Text>}
        </View>
      </LinearGradient>
    );
  }
}
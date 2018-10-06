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
      questionProgress:0,
      questionCounter:0
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.question.questionNumber != nextProps.question.questionNumber){
      this.setState({selectedOption:-1, 
        backgroundColor:'white',
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
    this.props.question.answer==this.state.selectedOption ?
      this.setState({backgroundColor:'green'}) : 
      this.setState({backgroundColor:'orange'});

    this.props.submitAnswer(this.state.selectedOption);
  }

  render() {
    let {questionNumber, question, options, answer} = this.props.question;
    
    return (
      <LinearGradient colors={['#000000', '#030184']}
        style={[styles.questionContainer, {padding: 10, alignItems: 'flex-start'}]}>
        <ProgressBarAndroid style={{width:'100%', alignSelf:'flex-start'}}
            color='white'
            styleAttr='Horizontal'
            indeterminate={false}
            progress={this.state.questionProgress}
        />
        {this.props.isMultiplayer && <ProgressBarAndroid style={{width:'100%'}}
          color='white'
          styleAttr="Horizontal"
          indeterminate={false}
          progress={this.state.timerProgress}
        />}
        <Text style={{ marginLeft:20, color:'white', fontSize:18 }} selectable={true}>{`Q.${this.state.questionCounter} ${question}`}</Text>
        <View>
        {options.map((option, index)=>{return(
          <View key={index} 
                style={styles.options} 
                pointerEvents={!this.props.isMultiplayer && this.props.showAnswer?'none':'auto'}>
            <CheckBox 
              textStyle={{color: 'white', fontSize:16, fontWeight:'normal'}}
              containerStyle={{backgroundColor: 'transparent', borderColor:'transparent'}}
              title={`${index+1}. ${option}`}
              checked={this.state.selectedOption === index}
              onPress={() => this.toggleOptions(index)}
            />
            {/* <Text style={{marginTop: 5, color:'white'}} onPress={()=>this.toggleOptions(index)}>{option}</Text> */}
          </View>)
        })}
        </View>

        <View style={{flex:1,flexDirection:'row'}}>
          {options.map((option, index)=>{return(
            <View key={index} 
                  style={styles.options} 
                  pointerEvents={!this.props.isMultiplayer && this.props.showAnswer?'none':'auto'}>
              <CheckBox 
                textStyle={{color: 'white', fontSize:16, fontWeight:'normal'}}
                containerStyle={{backgroundColor: 'transparent', borderColor:'transparent'}}
                title={`${index+1}`}
                checked={this.state.selectedOption === index}
                onPress={() => this.toggleOptions(index)}
              />
              {/* <Text style={{marginTop: 5, color:'white'}} onPress={()=>this.toggleOptions(index)}>{option}</Text> */}
            </View>)
          })}
        </View>
        <View style={{alignSelf:this.props.hand===0?'flex-start':'flex-end'}}>
          <TouchableOpacity style={styles.questionButton} disabled={!this.props.isMultiplayer && this.props.showAnswer} onPress={()=>this.submitAnswer()}>
            <Text style={{textAlign:'center', color:'white'}}>Submit Answer</Text>
          </TouchableOpacity>
          {this.props.showAnswer ? <Text style={{marginTop: 10,  marginLeft:23, color:'white' }}>Answer: {options[answer]}</Text>:<Text>{" "}</Text>}
        </View>
      </LinearGradient>
    );
  }
}
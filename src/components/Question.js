import React from 'react';
import { StyleSheet, Text, View, CheckBox, Button } from 'react-native';

export default class Question extends React.Component {
  constructor(props){
    super(props);
    console.log("Constructor", this.props);
    this.state= {
      question:this.props.question,
      option1:this.props.options[0],
      option2:this.props.options[1],
      option3:this.props.options[2],
      option4:this.props.options[3],
      checked1:false,
      checked2:false,
      checked3:false,
      checked4:false,
      selectedAns:undefined,
      backgroundColor:'yellow'
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      question:nextProps.question,
      option1:nextProps.options[0],
      option2:nextProps.options[1],
      option3:nextProps.options[2],
      option4:nextProps.options[3],
      checked1:false,
      checked2:false,
      checked3:false,
      checked4:false,
      selectedAns:undefined
    });
  }

  toggleOptions(value){
    switch(value){
      case 1:
        this.setState({checked1:true,
          checked2:false,
          checked3:false,
          checked4:false,
          selectedAns:1});
      break;
      case 2:
        this.setState({checked1:false,
          checked2:true,
          checked3:false,
          checked4:false,
          selectedAns:2});
      break;
      case 3:
        this.setState({checked1:false,
          checked2:false,
          checked3:true,
          checked4:false,
          selectedAns:3});
      break;
      case 4:
        this.setState({checked1:false,
          checked2:false,
          checked3:false,
          checked4:true,
          selectedAns:4});
      break;
      default:
        this.setState({checked1:false,
        checked2:false,
        checked3:false,
        checked4:false,
        selectedAns:undefined});
    }
  }

  nextQuestion(){
    this.setState({backgroundColor:'yellow'});
    this.props.nextQuestion();
  }

  submitAnswer(){
    console.log()
    if((this.state.selectedAns-1) == this.props.answer){
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
        <Text selectable={true}>{'Q. '}{this.state.question}</Text>

           <View key={1} style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.state.checked1}
              onValueChange={(value) => this.toggleOptions(1)}
            />
            <Text style={{marginTop: 5}} onPress={()=>this.toggleOptions(1)}>{this.state.option1}</Text>
           </View>

           <View key={2} style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.state.checked2}
              onValueChange={(value) => this.toggleOptions(2)}
            />
            <Text style={{marginTop: 5}} onPress={()=>this.toggleOptions(2)}>{this.state.option2}</Text>
           </View>

           <View key={3} style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.state.checked3}
              onValueChange={(value) => this.toggleOptions(3)}
            />
            <Text style={{marginTop: 5}} onPress={()=>this.toggleOptions(3)}>{this.state.option3}</Text>
           </View>

           <View key={4} style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.state.checked4}
              onValueChange={(value) => this.toggleOptions(4)}
            />
            <Text style={{marginTop: 5}} onPress={()=>this.toggleOptions(4)}>{this.state.option4}</Text>
          </View>

          <Button
            onPress={this.submitAnswer.bind(this)}
            title="Submit Answer"
            color="#841584"
          />

          <Button
            onPress={this.nextQuestion.bind(this)}
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
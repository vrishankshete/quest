import React from 'react';
import { View, BackHandler } from 'react-native';
import Loading from '../Loading/Loading';
import Question from '../Question/Question';
import { connect } from 'react-redux';
import { styles } from '../../styles/styles';

class Stage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            backgroundColor: 'white'
        }
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{this.props.navigation.navigate('Home');return true;});
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }
    
    static navigationOptions = {
        title: 'Multiplayer Game !!!',
        headerLeft: null,
    };

    submitAnswer(selectedOption){
        // if(selectedOption == this.props.currentQuestion.get('answer')){
        //     this.setState({backgroundColor:'green'});
        // }
        // else{
        //     this.setState({backgroundColor:'orange'})
        // }
    }

    render() {
        return (
        <View style={styles.questionContainer}>
            <Question
                question={this.props.currentQuestion.toJS()}
                backgroundColor={this.state.backgroundColor}
                submitAnswer={(selectedOption)=>this.submitAnswer(selectedOption)}
            />
            <Loading/>
        </View>
        )
    }
}

const mapStateToProps = (rootState) => {
    return {
        currentQuestion: rootState.stage.get('currentQuestion'),
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return{
        // correctAnswer: () => dispatch(correctAnswerAction()),
        // incorrectAnswer: () => dispatch(incorrectAnswerAction()),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Stage);
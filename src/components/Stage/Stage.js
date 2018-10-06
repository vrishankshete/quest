import React from 'react';
import { View, BackHandler, ToastAndroid } from 'react-native';
import Loading from '../Loading/Loading';
import Question from '../Question/Question';
import  { submitAnswer, disconnectGame, resetStage} from './actions'
import { connect } from 'react-redux';
import { styles } from '../../styles/styles';
import { errorCodes, multiPlayerQNos } from '../../config/config';

class Stage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            backgroundColor: 'white'
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.quizEnded == false && nextProps.quizEnded == true){
            this.props.navigation.navigate('DuoResults');
        }
        if(this.props.error == null && nextProps.error != null){
            this.props.navigation.navigate('Home');
            if(errorCodes[nextProps.error]){
                ToastAndroid.show(errorCodes[nextProps.error], ToastAndroid.SHORT);
            }
            else{
                ToastAndroid.show('Unexpected error...', ToastAndroid.SHORT);
            }
        }
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
            this.props.resetStage();
            this.props.disconnectAction();
            this.props.navigation.navigate('Home');
            this.backHandler.remove();
            return true;
        });
    }

    componentWillUnmount() {
        //this.backHandler.remove();
    }
    
    static navigationOptions = {
        title: 'Multiplayer Game !!!',
        headerLeft: null,
    };

    submitAnswer(selectedOption){
        this.props.submitAnswer({questionNumber:this.props.currentQuestion.get('questionNumber'),
            answer: selectedOption});
    }

    render() {
        return (
        <View style={styles.questionContainer}>
            <Question
                question={this.props.currentQuestion.toJS()}
                backgroundColor={this.state.backgroundColor}
                submitAnswer={(selectedOption)=>this.submitAnswer(selectedOption)}
                showAnswer={false}
                isMultiplayer={true}
                totalQuestions={multiPlayerQNos}
            />
            <Loading/>
        </View>
        )
    }
}

const mapStateToProps = (rootState) => {
    return {
        currentQuestion: rootState.stage.get('currentQuestion'),
        quizEnded: rootState.stage.get('quizEnded'),
        error: rootState.stage.get('error')
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return{
        submitAnswer: (answer) => dispatch(submitAnswer(answer)),
        disconnectAction: () => dispatch(disconnectGame()),
        resetStage: () => dispatch(resetStage()),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Stage);
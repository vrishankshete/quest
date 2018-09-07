import React from 'react';
import { View, BackHandler } from 'react-native';
import Loading from '../Loading/Loading';
import Question from '../Question/Question';
import { styles } from '../../styles/styles';

export default class Stage extends React.Component {

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{this.props.navigation.navigate('Home');return true;});
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }
    
    static navigationOptions = {
        title: 'Multiplayer Game !!!',
    };

    nextQuestion(){
    }

    render() {
        return (
        <View style={styles.questionContainer}>
            <Question nextQuestion={this.nextQuestion.bind(this)}/>
            <Loading/>
        </View>
        )
    }
}
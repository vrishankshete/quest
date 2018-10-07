import React from 'react';
import { connect } from 'react-redux';
import { View, Text, BackHandler } from 'react-native';
import { LinearGradient } from 'expo';
import { showScoreStyles, gradientColors } from '../../styles/styles';
import ShowScore from '../Helper/ShowScore'

class Results extends React.Component {

    static navigationOptions = {
        title: 'Results !!!',
        header: null,
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{this.props.navigation.navigate('Home');return true;});
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        let {totalAttempted, correctAnswers} = this.props;
        return (
            <LinearGradient style={showScoreStyles.duoContainer} colors={gradientColors}>
                <ShowScore totalAttempted={totalAttempted} 
                    correctAnswers={correctAnswers}
                    incorrectAnswers={totalAttempted-correctAnswers}/>
            </LinearGradient>
        );
    }
}

export const mapStateToProps = (rootState) => {
    return {
        totalAttempted: rootState.results.get("totalAttempted"),
        totalQuestions: rootState.results.get("totalQuestions"),
        correctAnswers: rootState.results.get("correctAnswers"),
    }
};

export default connect(mapStateToProps)(Results);
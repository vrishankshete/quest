import React from 'react';
import { connect } from 'react-redux';
import { View, BackHandler } from 'react-native';
import { showScoreStyles } from '../../styles/styles';
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
            <View style={showScoreStyles.duoContainer}>
                <ShowScore totalAttempted={totalAttempted} 
                    correctAnswers={correctAnswers}
                    incorrectAnswers={totalAttempted-correctAnswers}/>
            </View>
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
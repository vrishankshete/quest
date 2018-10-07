import React from 'react';
import { connect } from 'react-redux';
import { View, Text, BackHandler } from 'react-native';
import { LinearGradient } from 'expo';
import { styles } from '../../styles/styles';

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
        return (
            <LinearGradient style={styles.resultsContainer} colors={['#000000', '#030184']}>
                <Text selectable={true} style={{fontSize:18, color:'white'}}>
                    {'Total Attempted: '}{this.props.totalAttempted}
                </Text>
                <Text selectable={true} style={{fontSize:18, color:'white'}}>
                    {'Correct Answers: '}{this.props.correctAnswers}
                </Text>
                <Text selectable={true} style={{fontSize:18, color:'white'}}>
                    {'Incorrect Answers: '}{this.props.totalAttempted - this.props.correctAnswers}
                </Text>
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
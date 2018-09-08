import React from 'react';
import { connect } from 'react-redux';
import { View, Text, BackHandler } from 'react-native';
import { styles } from '../../styles/styles';

class Results extends React.Component {

    static navigationOptions = {
        title: 'Results !!!',
        headerLeft: null,
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{this.props.navigation.navigate('Home');return true;});
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        return (
            <View style={styles.resultsContainer}>
                <Text selectable={true}>
                    {'Total Attempted: '}{this.props.totalAttempted}
                </Text>
                <Text selectable={true}>
                    {'Correct Answers: '}{this.props.correctAnswers}
                </Text>
                <Text selectable={true}>
                    {'Incorrect Answers: '}{this.props.totalAttempted - this.props.correctAnswers}
                </Text>
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
import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

class Results extends React.Component {
    render() {
        return (
            <View style={{marginTop: 22, justifyContent: 'center'}}>
                <Text style={{ marginLeft:20 }} selectable={true}>
                    {'Total Attempted: '}{this.props.totalAttempted}
                </Text>
                <Text style={{ marginLeft:20 }} selectable={true}>
                    {'Correct Answers: '}{this.props.correctAnswers}
                </Text>
                <Text style={{ marginLeft:20 }} selectable={true}>
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
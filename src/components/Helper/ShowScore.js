import React from 'react';
import { Text, View } from 'react-native';
import { showScoreStyles } from '../../styles/styles';

export default class ShowScore extends React.Component {
 
    render() {
        return (
            <View style={showScoreStyles.container}>
                <Text style={showScoreStyles.scoreText}>
                    {'Total Attempted: '}{this.props.totalAttempted}
                </Text>
                <Text style={showScoreStyles.scoreText}>
                    {'Correct Answers: '}{this.props.correctAnswers}
                </Text>
                <Text style={showScoreStyles.scoreText}>
                    {'Incorrect Answers: '}{this.props.incorrectAnswers}
                </Text>
            </View>
        );
    }
}
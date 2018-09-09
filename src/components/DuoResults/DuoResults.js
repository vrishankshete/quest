import React from 'react';
import { connect } from 'react-redux';
import { View, Text, BackHandler } from 'react-native';
import { styles } from '../../styles/styles';

class DuoResults extends React.Component {

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
        let { score } = this.props;
        return (
            <View style={styles.resultsContainer}>
                {Object.keys(score).map(function(id){
                    return (
                        <View key={id}>
                            <Text selectable={true}>
                                {'Total Attempted: '}{score[id].attempted}
                            </Text>
                            <Text selectable={true}>
                                {'Correct Answers: '}{score[id].correct}
                            </Text>
                            <Text selectable={true}>
                                {'Incorrect Answers: '}{score[id].incorrect}
                            </Text>
                        </View>
                    );
                })}
            </View>
        );
    }
}

export const mapStateToProps = (rootState) => {
    return {
        score: rootState.duoResults.get("score")
    }
};

export default connect(mapStateToProps)(DuoResults);
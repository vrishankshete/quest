import React from 'react';
import { connect } from 'react-redux';
import { View, Text, BackHandler } from 'react-native';
import { LinearGradient } from 'expo';
import { styles } from '../../styles/styles';
import { disconnectGame, resetStage } from '../Stage/actions';

class DuoResults extends React.Component {

    static navigationOptions = {
        title: 'Results !!!',
        headerLeft: null,
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
            this.props.disconnectAction();
            this.props.navigation.navigate('Home');
            return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this.props.resetStage();
    }

    render() {
        let { score, socketId } = this.props;
        return (
            <LinearGradient style={styles.resultsContainer} colors={['#000000', '#030184']}>
                {Object.keys(score).map(function(id){
                    return (
                        <View key={id} style={{padding:10}}>
                            <Text style={{fontSize:18, color:'white'}}>{id == socketId ? 'Your score:' : 'Opponent\'s Score:'}</Text>
                            <Text selectable={true} style={{fontSize:18, color:'white'}}>
                                {'Total Attempted: '}{score[id].attempted}
                            </Text>
                            <Text selectable={true} style={{fontSize:18, color:'white'}}>
                                {'Correct Answers: '}{score[id].correct}
                            </Text>
                            <Text selectable={true} style={{fontSize:18, color:'white'}}>
                                {'Incorrect Answers: '}{score[id].incorrect}
                            </Text>
                        </View>
                    );
                })}
            </LinearGradient>
        );
    }
}

export const mapStateToProps = (rootState) => {
    return {
        score: rootState.duoResults.get("score"),
        socketId: rootState.stage.get("socketId")
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        disconnectAction: ()=>dispatch(disconnectGame()),
        resetStage: ()=>dispatch(resetStage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DuoResults);
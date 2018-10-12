import React from 'react';
import { connect } from 'react-redux';
import { View, Text, BackHandler } from 'react-native';
import { showScoreStyles } from '../../styles/styles';
import { disconnectGame, resetStage } from '../Stage/actions';
import ShowScore from '../Helper/ShowScore';

class DuoResults extends React.Component {

    static navigationOptions = {
        title: 'Results !!!',
        header: null,
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
        let opponentId;
        Object.keys(score).map(id=>{
            if(id!=socketId){
                opponentId=id
            }
        });
        return (
            <View style={showScoreStyles.duoContainer}>
                {score[socketId]?
                <View style={{flex:1}}>
                    <Text style={showScoreStyles.scoreText}>
                        {'Your Score'}
                    </Text>
                    <ShowScore totalAttempted={score[socketId].attempted}
                        correctAnswers={score[socketId].correct}
                        incorrectAnswers={score[socketId].incorrect}/>
                </View>:<View></View>}

                {score[opponentId]?
                <View style={{flex:1}}>
                    <Text style={showScoreStyles.scoreText}>
                        {'Opponent\'s Score'}
                    </Text>
                    <ShowScore totalAttempted={score[opponentId].attempted}
                        correctAnswers={score[opponentId].correct}
                        incorrectAnswers={score[opponentId].incorrect}/>
                </View>:<View></View>}
            </View>
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
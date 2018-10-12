import React from 'react';
import {connect} from 'react-redux';
import {Modal, View, ActivityIndicator, Text} from 'react-native';
import { loadingStyles } from '../../styles/styles';
import * as actionCreator from './actions'

class Loading extends React.Component {
    render() {
        return (
            <Modal  animationType="slide"
                    transparent={false}
                    visible={this.props.isLoading}
                    onRequestClose={() => {
                        this.props.stopLoading();
                        
                    }}>
                <View style={{flex:1, backgroundColor: '#040133'}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text style={loadingStyles.loadingText}>Please Wait...</Text>
                        <Text style={loadingStyles.loadingText}>{this.props.loadingMessage}</Text>
                        {this.props.roomId && <Text style={loadingStyles.loadingText}>{this.props.roomId}</Text>}
                    </View>
                </View>
            </Modal>
        );
    }
}

export const mapStateToProps = (rootState) => {
    return {
        isLoading: rootState.loading.get("isLoading"),
        roomId: rootState.stage.get("roomId"),
        loadingMessage: rootState.loading.get("loadingMessage")
    }
};

export const mapDispatchToProps = (dispatch) => {
    return{
      stopLoading: ()=> dispatch(actionCreator.hideLoadingAction())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
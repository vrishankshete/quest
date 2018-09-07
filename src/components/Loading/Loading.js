import React from 'react';
import {connect} from 'react-redux';
import {Modal, View, ActivityIndicator, Text} from 'react-native';
import {styles} from '../../styles/styles';
import * as actionCreator from './actions'

class Loading extends React.Component {
    render() {
        return (
            <Modal  animationType="fade"
                    transparent={false}
                    visible={this.props.isLoading}
                    onRequestClose={() => {
                        this.props.stopLoading();
                        
                    }}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{textAlign: 'center'}}>Please Wait...</Text>
                    <Text style={{textAlign: 'center'}}>{this.props.loadingMessage}</Text>
                    {this.props.roomId && <Text style={{textAlign: 'center'}}>{this.props.roomId}</Text>}
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
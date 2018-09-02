import React from 'react';
import {connect} from 'react-redux';
import {Modal, View, ActivityIndicator, Text} from 'react-native';
import * as actionCreator from './actions'

class Loading extends React.Component {
    render() {
        return (
            <Modal  animationType="fade"
                    transparent={false}
                    visible={this.props.isLoading}
                    onRequestClose={() => {
                        alert('Modal has been closed');
                        this.props.stopLoading();
                    }}>
                <View style={{marginTop: 270, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{textAlign: 'center'}}>Fetching Questions from Server</Text>
                </View>
            </Modal>
        );
    }
}

export const mapStateToProps = (rootState) => {
    return {
        isLoading: rootState.loading.get("isLoading")
    }
};

export const mapDispatchToProps = (dispatch) => {
    return{
      stopLoading: ()=> dispatch(actionCreator.hideLoadingAction())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
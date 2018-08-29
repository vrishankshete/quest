import React from 'react';
import {connect} from 'react-redux';
import {Modal, View, ActivityIndicator} from 'react-native';
import * as actionCreator from './actions'

class Loading extends React.Component {
    render() {
        return (
            <View style={{marginTop: 22}}>
                
                <Modal  animationType="fade"
                        transparent={false}
                        visible={this.props.isLoading}
                        onRequestClose={() => {
                            alert('Modal has been closed');
                        }}>
                    <View style={{marginTop: 270}}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </Modal>
            </View>
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
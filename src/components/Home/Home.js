import React from 'react';
import {connect} from 'react-redux';
import { View, TextInput, Dimensions, ToastAndroid, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import {createRoom, joinRoom, setHand} from './actions';
import { resetRoomId } from '../Stage/actions';
import { showLoadingAction } from '../Loading/actions';
import { homeStyles } from '../../styles/styles';

export class Home extends React.Component {
  static navigationOptions = {
    title: 'Choose your Game !!!',
    header: null
  };

  constructor(props){
    super(props);
    this.state = {
      roomIdText:''
    }
    //console.log('ASDASD::',Constants.deviceId, Constants.deviceName, Constants.platform);
  }

  joinRoomClicked(){
    if(this.state.roomIdText){
      this.props.showLoadingAction("Waiting for others to join...");
      this.props.joinRoom(this.state.roomIdText);
      this.props.navigation.navigate('Stage');
    }else{
      ToastAndroid.show('Enter room id to join !!!', ToastAndroid.SHORT);
    }
  }

  createRoomClicked(){
    this.props.showLoadingAction("Share this room id with opponent. Wait for him to join...");
    this.props.createRoom();
    this.props.navigation.navigate('Stage');
  }

  render() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={-1*Dimensions.get('window').height/6} style={homeStyles.container} behavior="padding">
      <View style={homeStyles.container}>
        <View style={homeStyles.titleContainer}>
          <Text style={homeStyles.textBig}>{'Choose Your Game Type:'}</Text>
        </View>
        <View style={homeStyles.actionsContainer}>
            <View style={homeStyles.actionsInnerContainer}>
              <TouchableOpacity style={homeStyles.quizButton} onPress={()=>{this.props.resetRoomId();this.props.navigation.navigate('Questions');}}>
              <Text style={homeStyles.textMedium}>{'SINGLE\nPLAYER\nQUIZ'}</Text>
              </TouchableOpacity>
            </View>
          <View style={homeStyles.actionsInnerContainer}>
            <TextInput
              keyboardType = 'numeric'
              style={homeStyles.input}
              placeholder="Room Id"
              placeholderTextColor="grey"
              onChangeText={(roomIdText) => this.setState({roomIdText})}
              maxLength = {4}
            />
            <TouchableOpacity style={homeStyles.quizButton} onPress={()=>this.joinRoomClicked()}>
              <Text style={homeStyles.textMedium}>{'JOIN\nROOM'}</Text>
            </TouchableOpacity>
          </View>
          <View style={homeStyles.actionsInnerContainer}>
            <TouchableOpacity style={homeStyles.quizButton} onPress={()=>this.createRoomClicked()}>
              <Text style={homeStyles.textMedium}>{'CREATE\nROOM'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </KeyboardAvoidingView>
    )
  }
}

 const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return{
    createRoom: () => dispatch(createRoom()),
    joinRoom: (roomIdText) => dispatch(joinRoom(roomIdText)),
    showLoadingAction: (msg) => dispatch(showLoadingAction(msg)),
    resetRoomId: () => dispatch(resetRoomId())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
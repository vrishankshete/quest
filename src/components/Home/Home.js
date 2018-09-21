import React from 'react';
import {connect} from 'react-redux';
import { View, TextInput, Button, ToastAndroid, TouchableOpacity, Text } from 'react-native';
import {createRoom, joinRoom} from './actions';
import { resetRoomId } from '../Stage/actions';
import { showLoadingAction } from '../Loading/actions';
import { styles } from '../../styles/styles';
import { LinearGradient, Constants } from 'expo';

export class Home extends React.Component {

  static navigationOptions = {
    title: 'Choose your Game !!!',
    headerLeft: null
  };

  constructor(props){
    super(props);
    this.state = {
      roomIdText:''
    }
    console.log('ASDASD::',Constants.deviceId, Constants.deviceName, Constants.platform);
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
      <LinearGradient style={styles.homeContainer} colors={['#d2ff9d', '#ffffff']}>
      {/*'#000000', '#030184'     '#52e830', '#ffffff'*/}
        
        <View style={{paddingBottom: 30}}>
          <TouchableOpacity style={styles.singleQuizButton} onPress={()=>{this.props.resetRoomId();this.props.navigation.navigate('Questions');}}>
            <Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>SINGLE PLAYER QUIZ</Text>
          </TouchableOpacity>
        </View>
        <View style={{padding: 10}}>
          <TextInput
            keyboardType = 'numeric'
            style={{height: 40, width:80, marginLeft:5, textAlign: 'center'}}
            placeholder="Room Id"
            placeholderTextColor="grey"
            onChangeText={(roomIdText) => this.setState({roomIdText})}
            maxLength = {4}
          />
        
          <TouchableOpacity style={styles.singleQuizButton} onPress={()=>this.joinRoomClicked()}>
            <Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>JOIN{'\n'}ROOM</Text>
          </TouchableOpacity>
        </View>

        <View style={{padding: 10}}>
          <TouchableOpacity style={styles.singleQuizButton} onPress={()=>this.createRoomClicked()}>
            <Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>CREATE{'\n'}ROOM</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
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
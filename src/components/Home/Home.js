import React from 'react';
import {connect} from 'react-redux';
import { View, TextInput, Button, ToastAndroid, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import {createRoom, joinRoom, setHand} from './actions';
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
      <KeyboardAvoidingView keyboardVerticalOffset={70} style={styles.homeContainer} behavior="padding">
      <LinearGradient style={styles.homeContainer} colors={['#000000', '#030184']}>
        <Text style={{alignSelf:'flex-start', textAlign:'center', padding:20, marginLeft:20, fontWeight:'bold', fontSize:20, color:'white'}}>{'In which hand you are currently holding your phone?'}</Text>

        <View style={styles.orientationContainer}>
          <TouchableOpacity style={[styles.lefty, {backgroundColor:this.props.hand==0?'grey':'white'}]} onPress={()=>this.props.setHand(0)}>
            <Text style={{textAlign:'center', color:'black', fontWeight:'bold', fontSize:20}}>LEFT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.righty, {backgroundColor:this.props.hand==1?'grey':'white'}]} onPress={()=>this.props.setHand(1)}>
            <Text style={{textAlign:'center', color:'black', fontWeight:'bold', fontSize:20}}>RIGHT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.homeContainer1}>
        {/*'#000000', '#030184'  '#d2ff9d', '#ffffff'   '#52e830', '#ffffff'*/}
          <View style={{padding: 10}}>
            <TouchableOpacity style={styles.singleQuizButton} onPress={()=>{this.props.resetRoomId();this.props.navigation.navigate('Questions');}}>
              <Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>{'SINGLE\nPLAYER\nQUIZ'}</Text>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10}}>
            <TextInput
              keyboardType = 'numeric'
              style={{height: 40, width:80, marginLeft:5, textAlign: 'center', color:'white'}}
              placeholder="Room Id"
              placeholderTextColor="grey"
              onChangeText={(roomIdText) => this.setState({roomIdText})}
              maxLength = {4}
            />
            <TouchableOpacity style={styles.singleQuizButton} onPress={()=>this.joinRoomClicked()}>
              <Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>{'JOIN\nROOM'}</Text>
            </TouchableOpacity>
          </View>

          <View style={{padding: 10}}>
            <TouchableOpacity style={styles.singleQuizButton} onPress={()=>this.createRoomClicked()}>
              <Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>{'CREATE\nROOM'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      </KeyboardAvoidingView>
    )
  }
}

 const mapStateToProps = (rootState)=>{
  return{
    hand: rootState.home.get('hand')
  }
 };

const mapDispatchToProps = (dispatch) => {
  return{
    createRoom: () => dispatch(createRoom()),
    joinRoom: (roomIdText) => dispatch(joinRoom(roomIdText)),
    showLoadingAction: (msg) => dispatch(showLoadingAction(msg)),
    resetRoomId: () => dispatch(resetRoomId()),
    setHand: (hand) => dispatch(setHand(hand))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
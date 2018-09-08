import React from 'react';
import {connect} from 'react-redux';
import { View, TextInput, Button, ToastAndroid } from 'react-native';
import {createRoom, joinRoom} from './actions';
import { styles } from '../../styles/styles';

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
  }

  joinRoomClicked(){
    if(this.state.roomIdText){
      this.props.joinRoom(this.state.roomIdText);
      this.props.navigation.navigate('Stage');
    }else{
      ToastAndroid.show('Enter room id to join !!!', ToastAndroid.SHORT);
    }
  }

  createRoomClicked(){
    this.props.createRoom();
    this.props.navigation.navigate('Stage');
  }

  render() {
    return (
      <View style={styles.homeContainer}>
        
        <View style={{paddingBottom: 30}}>
          <Button
            onPress={()=>this.props.navigation.navigate('Questions')}
            title="Single Player Quiz"
            color="#841584"
          />
        </View>
        <View style={{padding: 10}}>
          <TextInput
            keyboardType = 'numeric'
            style={{height: 40, width:70}}
            placeholder="Room Id"
            placeholderTextColor="grey"
            onChangeText={(roomIdText) => this.setState({roomIdText})}
            maxLength = {4}
          />
        </View>
        <View style={{padding: 10}}>
          <Button
            onPress={()=>this.joinRoomClicked()}
            title="Join Room"
            color="#841584"
          />
        </View>

        <View style={{padding: 10}}>
          <Button
            onPress={()=>this.createRoomClicked()}
            title="Create Room"
            color="#841584"
          />
        </View>
      </View>
    )
  }
}

 const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return{
    createRoom: () => dispatch(createRoom()),
    joinRoom: (roomIdText) => dispatch(joinRoom(roomIdText)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
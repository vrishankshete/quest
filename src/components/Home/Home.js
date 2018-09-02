import React from 'react';

import { StyleSheet, Text, View, CheckBox, Button } from 'react-native';


export default class Home extends React.Component {

  render() {
      return (
        <View style={{
            flex:1,
            flexDirection: 'column',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            onPress={()=>this.props.navigation.navigate('Questions')}
            title="Start Quiz"
            color="#841584"
          />
        </View>
      )
    }
}
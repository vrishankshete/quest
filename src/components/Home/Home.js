import React from 'react';

import { StyleSheet, Text, View, CheckBox, Button } from 'react-native';


export default class Home extends React.Component {

  render() {
      return (
        <View style={{
            flex:1,
            flexDirection: 'column',
            backgroundColor: 'white',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Button
            onPress={()=>this.props.navigation.navigate('Questions')}
            title="Next Question"
            color="#841584"
          />
        </View>
      )
    }
}
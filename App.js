import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import Deck from './animate/Deck'
import Wiggle from './animate/Wiggle'

export default class App extends React.Component {
  render() {
    return (
      
        <View style={styles.container}>
          <Wiggle/>
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
});

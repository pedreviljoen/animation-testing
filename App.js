import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import Deck from './animate/Deck'
import Wiggle from './animate/Wiggle'
import AnimatedItem from './animate/AnimatedItem'

export default class App extends React.Component {
  render() {
    return (
      
        <View style={styles.container}>
          <AnimatedItem
            containerStyle={styles.animatedBox}
          >
            <Text>
              Click me to open some options
            </Text>
          </AnimatedItem>
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
    marginTop: 30
  },
  animatedBox: {
    height: 100,
    backgroundColor: '#38C8EC'
  }
});

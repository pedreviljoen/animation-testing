import React, { Component } from "react";
import { TouchableOpacity, Text, Animated, StyleSheet } from "react-native";

const TWIGGLE_DURATION = 125
export default class Wiggle extends Component {
  constructor(props) {
    super(props);
    this.rotation = new Animated.Value(0);
  }

  triggerWiggle = () => {
    Animated.sequence([
      Animated.timing(this.rotation, {
        toValue: -4,
        duration: TWIGGLE_DURATION
      }),
      Animated.timing(this.rotation, {
        toValue: 4,
        duration: TWIGGLE_DURATION
      }),
      Animated.timing(this.rotation, {
        toValue: -4,
        duration: TWIGGLE_DURATION
      }),
      Animated.timing(this.rotation, {
        toValue: 4,
        duration: TWIGGLE_DURATION
      }),
      Animated.timing(this.rotation, {
        toValue: 0,
        duration: TWIGGLE_DURATION
      })
    ]).start();
  };

  render() {
    const wiggle = this.rotation.interpolate({
      inputRange: [-20, 20],
      outputRange: ["-15deg", "15deg"]
    });

    return (
      <Animated.View style={[styles.main, { transform: [{ rotate: wiggle }] }]}>
        <TouchableOpacity onPress={this.triggerWiggle}>
          <Text style={{ fontSize: 18 }}>I Wiggle</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#3BD0F5",
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center"
  }
});

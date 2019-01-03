import React, { Component } from 'react'
import { View, Animated, StyleSheet, PanResponder, Dimensions, Text } from 'react-native'
import cards from '../data/cards'

// constant variables driving animations
const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_DURATION = 250
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.50

class ListItem extends Component {
  constructor(props){
    super(props)

    const itemPosition = new Animated.ValueXY({x: 0, y: 0})
    const actionPostion = new Animated.ValueXY({x: SCREEN_WIDTH, y: 0})
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        itemPosition.setValue({x: gesture.dx, y: 0})
        actionPostion.setValue({x: SCREEN_WIDTH + gesture.dx, y: 0})
      },
      onPanResponderRelease: (event, gesture) => {
        if(gesture.dx < -SWIPE_THRESHOLD){
          this.forceOpen(gesture.dx)
        } else {
          this.resetPosition()
        }
      }
    })

    this.state = {
      card: {
        title: ''
      }
    }

    this.panResponder = panResponder
    this.itemPosition = itemPosition
    this.actionPostion = actionPostion
  }

  componentWillMount(){
    this.setState({card: this.props.card})
  }

  //
  forceOpen = (change = 0.0) => {
    Animated.parallel([
      Animated.spring(this.itemPosition, {
        toValue: {x: -50, y: 0}
      }),
      Animated.spring(this.actionPostion, {
        toValue: {x: SCREEN_WIDTH - 50, y: 0}
      })
    ]).start()
  }

  resetPosition = () => {
    Animated.parallel([
      Animated.spring(this.itemPosition, {
        toValue: {x: 0, y: 0}
      }),
      Animated.spring(this.actionPostion, {
        toValue: {x: SCREEN_WIDTH, y: 0}
      })
    ]).start()
  }
  
  getItemStyle = () => {
    const itemPosition = this.itemPosition
    const translate = itemPosition.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH],
      outputRange: [-100, 0, 100]
    })

    return{
      ...itemPosition.getLayout(),
      //transform: [{translate}]
    }
  }

  getActionStyle = () => {
    const actionPostion = this.actionPostion
    const translate = actionPostion.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH],
      outputRange: [SCREEN_WIDTH - 100, SCREEN_WIDTH, SCREEN_WIDTH + 100]
    })

    return {
      ...actionPostion.getLayout(),
      //transform: [{translate}]
    }
  }
  //
  render() {
    const {card} = this.state
      return(
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[this.getItemStyle(), styles.main]}
        >
          <View style={{backgroundColor: '#f0f', position: 'absolute', left: 0, width: SCREEN_WIDTH, height: 50}}>
            <Text>
              {card.title}
            </Text>
          </View>
          <View style={{position: 'absolute', left: SCREEN_WIDTH, width: 50, height: 50, backgroundColor: '#000'}}>
          </View>
        </Animated.View>
      )
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    flex: 1,
    height: 50,
    width: SCREEN_WIDTH,
    position: 'relative',
    
    margin: 10
  }
})

export default ListItem
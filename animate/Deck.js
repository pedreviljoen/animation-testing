import React, { Component } from 'react'
import { View, TouchableOpacity, Text, PanResponder, Animated, Dimensions, StyleSheet } from 'react-native'

// data & component import
import cards from '../data/cards'
import CardItem from './CardItem'
import ListItem from './ListItem'
import Wiggle from './Wiggle';

// constant values
const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_DURATION = 250
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }

  // constructor
  constructor(props){
    super(props)

    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({x: gesture.dx, y: gesture.dy})
      },
      onPanResponderRelease: (event, gesture) => {
        if(gesture.dx > SWIPE_THRESHOLD){
          this.forceSwipe('right')
        } else if (gesture.dx < -SWIPE_THRESHOLD){
          this.forceSwipe('left')
        } else {
          this.resetPosition()
        }
      }
    })

    this.panResponder = panResponder
    this.position = position
    this.state = { index: 0 }
  }

  // helper methods
  getCardStyle() {
    const position = this.position
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })

    return {
      ...position.getLayout(),
      transform: [{rotate}] 
    }
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: {x: 0, y: 0}
    }).start()
  }

  forceSwipe(direction = ''){
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH

    Animated.timing(this.position, {
      toValue: {x, y: 0},
      duration: SWIPE_DURATION
    }).start(() => this.onSwipeComplete(direction))
  }

  onSwipeComplete(direction = '') {
    const { onSwipeLeft, onSwipeRight} = this.props
    const item = cards[this.state.index]
    
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
    this.position.setValue({x: 0, y: 0})
    this.setState({index: this.state.index + 1})
  }

  // render methods
  renderListView() {
    return cards.map((card, i) => {
      return(
        <ListItem
          card={card}
          key={i}
        />
      )
    })

  }

  renderWiggle(){
    return(
      <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <Wiggle/>
      </View>
    )
  }


  renderCards(){
    const { index } = this.state

    if(index >= cards.length){
      return(
        <View
          style={{flex: 1, justifyContent: 'center', height: 200}}
        >
          <TouchableOpacity
            style={{alignItems: 'center', padding: 10, height: 50}}
            onPress={() => this.setState({index: 0})}
          >
            <Text style={{color: 'rgb(100,100,200)'}}>
              Show cards
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return cards.map((item, i) => {
        if(i < index) {
          return null
        }
        
        if(i === index){
          return (
            <Animated.View
              key={item.id}
              style={[this.getCardStyle()]}
              {...this.panResponder.panHandlers}
            >
              <CardItem item={item}/>
            </Animated.View>
          ) 
        }
  
        return (
          <View key={item.id}>
            <CardItem key={item.id} item={item}/>
          </View>
        )
      })
    }
  }

  render() {
    return(
      <View>
        {this.renderListView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute'
  }
})

export default Deck
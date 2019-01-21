import React from 'react'
import { Card } from 'react-native-elements'
import { Text } from 'react-native'

const CardItem = ({ item }) => {
  return (
      <Card
        title={item.title}
        image={{uri: item.uri}}
      >
        <Text>
          {item.description}
        </Text>
      </Card>
  )
}

export default CardItem
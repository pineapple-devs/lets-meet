import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './Styles/MenuItemStyles.js'

class MenuItem extends Component {
  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText
  }

  render () {
    return (
      <View>
        <Text onPress={this.props.onPress} style={styles.shape}>
          {this.getText()}</Text>
      </View>
    )
  }

}

export default MenuItem

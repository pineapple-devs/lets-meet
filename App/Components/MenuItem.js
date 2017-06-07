import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './Styles/MenuItemStyles.js';
import Icon from 'react-native-vector-icons/FontAwesome';

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

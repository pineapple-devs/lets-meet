import React, { Component, PropTypes } from 'react';
import { ScrollView, Image, BackAndroid, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

class MenuItem extends Component {
static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object
  }

   getText () {
      const buttonText = this.props.text || this.props.children || ''
      return buttonText.toUpperCase()
    }

render () {
    return (
      <View >
        <Text onPress={this.props.onPress} style={{color: 'white', backgroundColor: 'green'}}>{this.getText()}</Text>
      </View>
    )
  }

}

export default MenuItem

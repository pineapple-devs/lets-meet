import React, { PropTypes } from 'react'
import { TouchableHighlight, Text } from 'react-native'
import styles from './Styles/AddNewButtonStyles'

export default class CircledButton extends React.Component {
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
      <TouchableHighlight style={styles.addButton} underlayColor='#696969' onPress={this.props.onPress}>
        <Text style={{fontSize: 30, color: 'white', textAlign: 'center', textAlignVertical: 'center'}}>
          {this.getText()}
        </Text>
      </TouchableHighlight>

    )
  }
}

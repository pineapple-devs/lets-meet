import React from 'react'
import { View, Modal, TouchableHighlight, Text } from 'react-native'
import RoundedButton from '../../Components/RoundedButton'
import NewMeetingModal from '../../Components/NewMeetingModal'
import styles from '../../Components/Styles/AddNewButtonStyles'

export default class AddNewMeetingButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
    return (
    <View>
      <TouchableHighlight style={styles.addButton}
          underlayColor='#696969' onPress={this.toggleModal}>
           <Text style={{fontSize: 60, color: 'white'}}>+</Text>
      </TouchableHighlight>

      <Modal visible={this.state.showModal} onRequestClose={this.toggleModal}>
          <NewMeetingModal screenProps={{ toggle: this.toggleModal }} />
      </Modal>
      </View>
        )

  }
}

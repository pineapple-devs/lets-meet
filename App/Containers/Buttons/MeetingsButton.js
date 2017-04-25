import React from 'react'
import { View, Modal } from 'react-native'
import RoundedButton from '../../Components/RoundedButton'
import MeetingsScreen from '../MeetingsScreen'

export default class MeetingsButton extends React.Component {
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
        <RoundedButton onPress={this.toggleModal}>
          Meetings
        </RoundedButton>
        <Modal
          visible={this.state.showModal}
          onRequestClose={this.toggleModal}
        >
          <MeetingsScreen screenProps={{ toggle: this.toggleModal }} />
        </Modal>
      </View>
    )
  }
}

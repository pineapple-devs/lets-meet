import React from 'react'
import { View, Modal } from 'react-native'
import RoundedButton from '../../Components/RoundedButton'
import CalendarScreen from '../CalendarScreen'

export default class GoToScheduleButton extends React.Component {
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
          Open Calendar
        </RoundedButton>
        <Modal
          visible={this.state.showModal}
          onRequestClose={this.toggleModal}>
          <CalendarScreen screenProps={{ toggle: this.toggleModal }} />
        </Modal>
      </View>
    )
  }
}

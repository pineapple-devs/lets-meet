import React from 'react'
import { View } from 'react-native'
import CircledButton from '../../Components/CircledButton'
import { Actions } from 'react-native-router-flux'

export default class AddNewMeetingButton extends React.Component {
  render () {
    return (
      <View>
        <CircledButton onPress={() => Actions.addMeetingForm()}>
          +
        </CircledButton>
      </View>
    )
  }
}

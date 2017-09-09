import React from 'react'
import {View, Modal} from 'react-native'
import CircledButton from '../../Components/CircledButton'
import AddMeetingForm from '../../Containers/AddMeetingForm'
import { Actions } from 'react-native-router-flux'

export default class AddNewMeetingButton extends React.Component {

  render () {
    return (
      <View>
        <CircledButton onPress={() =>
          Actions.addMeetingForm()}>+</CircledButton>
      </View>
    )
  }
}

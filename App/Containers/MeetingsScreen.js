import React from 'react'
import { View } from 'react-native'
import MeetingListView from './MeetingListView.js'
import AddNewMeetingButton from './Buttons/AddNewMeetingButton.js'

// Styles
import listStyles from './Styles/ListviewExampleStyles'

class MeetingsScreen extends React.Component {
  render () {
    return (
      <View style={listStyles.container}>
        <View style={listStyles.container}>
          <MeetingListView />
        </View>
        <AddNewMeetingButton />
      </View>
    )
  }
}

export default MeetingsScreen

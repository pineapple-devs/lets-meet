import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Images } from '../Themes'
import MeetingListView from './MeetingListView.js'

// Styles
import listStyles from './Styles/ListviewExampleStyles'

import CalendarStrip from 'react-native-calendar-strip'

class MeetingsScreen extends React.Component {
  render () {
    return (
      <View style={listStyles.container}>
        <CalendarStrip
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{type: 'border',
            duration: 300,
            borderWidth: 1,
            borderHighlightColor: 'red'}}
          style={{height: 100, paddingTop: 20, paddingBottom: 10}}
          calendarHeaderStyle={{color: 'white'}}
          calendarColor={'#7743CE'}
          dateNumberStyle={{color: 'white'}}
          dateNameStyle={{color: 'white'}}
          iconLeft={Images.leftArrow}
          iconRight={Images.rightArrow}
          iconContainer={{flex: 0}}
        />
        <View style={listStyles.container}>
          <MeetingListView />
        </View>
      </View>
    )
  }
}

export default MeetingsScreen

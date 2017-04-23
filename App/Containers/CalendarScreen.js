import React from 'react'
import { View } from 'react-native'
import { Images } from '../Themes'

import CalendarStrip from 'react-native-calendar-strip'

class CalendarScreen extends React.Component {
  render () {
    return (
      <View>
        <CalendarStrip
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{type: 'border',
            duration: 300,
            borderWidth: 2,
            borderHighlightColor: 'white'}}
          style={{height: 100, paddingTop: 20, paddingBottom: 10}}
          calendarHeaderStyle={{color: 'white'}}
          calendarColor={'#7743CE'}
          dateNumberStyle={{color: 'white'}}
          dateNameStyle={{color: 'white'}}
          iconLeft={Images.leftArrow}
          iconRight={Images.rightArrow}
          iconContainer={{flex: 0.2}}
        />
      </View>
    )
  }
}

export default CalendarScreen

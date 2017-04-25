import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Images } from '../Themes'
import HourListView from './HourListView.js'

// Styles
import listStyles from './Styles/ListviewExampleStyles'

import CalendarStrip from 'react-native-calendar-strip'

class CalendarScreen extends React.Component {
  render () {
    return (
      <View style={listStyles.container}>
        <TouchableOpacity onPress={this.props.screenProps.toggle} style={{
          position: 'absolute',
          paddingTop: 5,
          paddingHorizontal: 5,
          zIndex: 5
        }}>
          <Image source={Images.closeButton} />
        </TouchableOpacity>
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
          <HourListView />
        </View>
      </View>
    )
  }
}

export default CalendarScreen
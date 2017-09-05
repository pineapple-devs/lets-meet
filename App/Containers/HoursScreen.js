import React from 'react'
import { View } from 'react-native'
import {Images} from '../Themes'
import HourListView from './HourListView.js'
import AddNewMeetingButton from './Buttons/AddNewMeetingButton.js'
import {Actions} from 'react-native-router-flux'
// Styles
import listStyles from './Styles/ListviewExampleStyles'

import CalendarStrip from 'react-native-calendar-strip'

class HoursScreen extends React.Component {
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal})
  };

  monthYear (event) {
    var monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    return monthNames[event.getMonth()] + ' ' + event.getFullYear()
  }

  render () {
    return (
      <View style={listStyles.container}>
        <CalendarStrip
          selectedDate={this.props.date}
          showMonth={false}
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{
            type: 'border',
            duration: 300,
            borderWidth: 1,
            borderHighlightColor: 'red'
          }}
          style={{height: 80, paddingTop: 10, paddingBottom: 10}}
          calendarHeaderStyle={{color: 'white'}}
          calendarColor={'#004c40'}
          dateNumberStyle={{color: 'white'}}
          dateNameStyle={{color: 'white'}}
          iconLeft={Images.leftArrow}
          iconRight={Images.rightArrow}
          iconContainer={{flex: 0}}
          onDateSelected={event =>
            Actions.refresh({title: this.monthYear(event._d), date: event._d})}
          onWeekChanged={event =>
            Actions.refresh({
              title: this.monthYear(
                new Date(
                  event._d.setDate(
                    event._d.getDate() +
                      (this.props.date.getDay() === 0
                        ? 6
                        : this.props.date.getDay() - 1),
                  ),
                ),
              ),
              date: event._d
            })}
        />
        <View style={listStyles.container}>
          <HourListView date={this.props.date} />
          <AddNewMeetingButton />
        </View>
      </View>
    )
  }
}

export default HoursScreen

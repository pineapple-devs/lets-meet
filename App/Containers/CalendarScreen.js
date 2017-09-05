import React from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { CalendarList } from 'react-native-calendars'
// Styles
import listStyles from './Styles/ListviewExampleStyles'

class CalendarScreen extends React.Component {

  constructor (props) {
    super(props)
    this.onDayPress = this.onDayPress.bind(this)
    var date = new Date()
    date.setHours(date.getHours() + 2) // vremenska zona nam je GTM+2
    this.state = {selected: date.toISOString().slice(0, 10)}
  }

  monthYear (day) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']
    var d = new Date(day.dateString)
    return monthNames[d.getMonth()] + ' ' + d.getFullYear()
  }

  onDayPress (day) {
    this.setState({ selected: day.dateString })
    Actions.hoursScreen({title: this.monthYear(day), date: new Date(day.dateString)})
  }

  render () {
    return (
      <View style={listStyles.container}>
        <CalendarList
          onDayPress={(day) => this.onDayPress(day)}
          markedDates={{[this.state.selected]: {selected: true}}}
          pastScrollRange={24}
          futureScrollRange={24} />
      </View>
    )
  }
}

export default CalendarScreen

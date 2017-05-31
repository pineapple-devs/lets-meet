import React from 'react'
import { View, TouchableOpacity, Image, TouchableHighlight, Text, Modal, BackAndroid } from 'react-native'
import { Images } from '../Themes'
import styles from '../Components/Styles/AddNewButtonStyles'
import { Actions } from 'react-native-router-flux'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
// Styles
import listStyles from './Styles/ListviewExampleStyles'


class CalendarScreen extends React.Component {

  constructor (props) {
    super(props)
    this.onDayPress = this.onDayPress.bind(this)
  }

  monthYear (day) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"]
    var d = new Date(day.dateString)
    return monthNames[d.getMonth()]+" "+d.getFullYear()
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  onDayPress(day) {
    debugger;
    this.setState({ selected: day.dateString })
  }

  render () {
    return (
      <View style={listStyles.container}>
        <CalendarList
          onDayPress={(day) => Actions.hoursScreen({title: this.monthYear(day), date: new Date(day.dateString)})}
          pastScrollRange={24}
          futureScrollRange={24}/>
      </View>
    )
  }
}

export default CalendarScreen

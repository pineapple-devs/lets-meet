import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid, Text } from 'react-native'
import styles from './Styles/DrawerContentStyles'
import { Images } from '../Themes'
import { Actions } from 'react-native-router-flux';
import MenuItem from '../Components/MenuItem.js'
import Icon from 'react-native-vector-icons/FontAwesome';

import CalendarButton from '../Containers/Buttons/CalendarButton.js'
import SettingsButton from '../Containers/Buttons/SettingsButton.js'
import MeetingsButton from '../Containers/Buttons/MeetingsButton.js'

class DrawerContent extends Component {
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  render () {
    return (
      <ScrollView style={styles.container}>

        <Image source={Images.pattern1} style={styles.logo} />

        <MenuItem onPress={() => {Actions.launchScreen(); this.context.drawer.close();}}>
           Home
        </MenuItem>

        <MenuItem onPress={() => {Actions.calendarScreen(); this.context.drawer.close();}}>
        <Icon name="calendar" size={20} style={styles.iconStyle} />
          &nbsp;&nbsp;Calendar
        </MenuItem>

        <MenuItem onPress={() => {Actions.meetingsScreen(); this.context.drawer.close();}}>
          <Icon name="calendar-o" size={20} style={styles.iconStyle} />
          &nbsp;&nbsp;Meetings
        </MenuItem>

        <MenuItem onPress={() => {Actions.meetingsScreen(); this.context.drawer.close();}}>
           <Icon name="user" size={20} style={styles.iconStyle} />
           &nbsp;&nbsp;Profile
        </MenuItem>


      </ScrollView>
    )
  }
}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent

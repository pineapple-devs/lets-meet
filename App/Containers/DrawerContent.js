import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid, Text } from 'react-native'
import styles from './Styles/DrawerContentStyles'
import { Images } from '../Themes'
import { Actions } from 'react-native-router-flux';
import MenuItem from './MenuItem.js'

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
      <ScrollView>
        <Image source={Images.logo} style={styles.logo} />

        <Text onPress={() => {Actions.calendarScreen(); this.context.drawer.close();}} style={{color: 'white', backgroundColor: '#ffaaaa'}}>This is CalendarScreen!</Text>
        <MenuItem onPress={() => {Actions.calendarScreen(); this.context.drawer.close();}}>
          Test
        </MenuItem>

        <CalendarButton />
        <MeetingsButton />
        <SettingsButton />
      </ScrollView>
    )
  }
}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent

import React, { Component } from 'react'
import { TotalNavHeight } from 'react-native';
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationBarStyles'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import CalendarScreen from '../Containers/CalendarScreen'
import MeetingsScreen from '../Containers/MeetingsScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux

* Contains all the screens for navigation through the application using react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
         <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene
            key='drawerChildrenWrapper'
            navigationBarStyle={Styles.navBar}
            titleStyle={Styles.title}
            leftButtonIconStyle={Styles.leftButton}
            rightButtonTextStyle={Styles.rightButton}
          >
            <Scene initial key='launchScreen' component={LaunchScreen} title='Glad to have you back!' sceneStyle={{paddingTop: 54}} />
            <Scene key="calendarScreen" component={CalendarScreen} title="Your calendar is here." sceneStyle={{paddingTop: 54}} />
            <Scene key="meetingsScreen" component={MeetingsScreen} sceneStyle={{paddingTop: 54}} />
          </Scene>
        </Scene>

      </Router>
    )
  }
}

export default NavigationRouter

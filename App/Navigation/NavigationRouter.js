import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import CalendarScreen from '../Containers/CalendarScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux

* Contains all the screens for navigation through the application using react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='root'>

          <Scene key='drawer' component={NavigationDrawer} open={false} />
          <Scene
            key='drawerChildrenWrapper'
            navigationBarStyle={Styles.navBar}
            titleStyle={Styles.title}
            leftButtonIconStyle={Styles.leftButton}
            rightButtonTextStyle={Styles.rightButton}
          />
          <Scene initial key='launchScreen' component={LaunchScreen} title='Glad to have you back!' />
          <Scene key="calendarScreen" component={CalendarScreen} title="Your calendar is here." />

        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter

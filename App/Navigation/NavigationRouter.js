import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Scene, Router, Switch } from 'react-native-router-flux'
import Styles from './Styles/NavigationBarStyles'
import NavigationDrawer from './NavigationDrawer'
import { connect } from 'react-redux'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import CalendarScreen from '../Containers/CalendarScreen'
import HoursScreen from '../Containers/HoursScreen'
import MeetingsScreen from '../Containers/MeetingsScreen'
import MeetingDetailsScreen from '../Containers/MeetingDetailsScreen'
import EditMeetingForm from '../Containers/EditMeetingForm'
import SentInvitationsScreen from '../Containers/SentInvitationsScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux

* Contains all the screens for navigation through the application using react-native-router-flux
***************************/

const loading = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  )
}
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
            <Scene
              initial
              key='root'
              component={connect(state => ({
                userId: state.login.userId
              }))(Switch)}
              tabs
              unmountScenes
              selector={props =>
                props.userId ? 'launchScreen' : 'loginScreen'}
            >
              <Scene
                key='loading'
                component={loading}
                title=''
                sceneStyle={{ paddingTop: 54 }}
              />
              <Scene
                key='launchScreen'
                component={LaunchScreen}
                title='Glad to have you back!'
                sceneStyle={{ paddingTop: 54 }}
                navigationBarStyle={Styles.navBar}
                titleStyle={Styles.title}
                leftButtonIconStyle={Styles.leftButton}
              />
              <Scene key='loginScreen' component={LoginScreen} hideNavBar />
            </Scene>

            <Scene
              key='calendarScreen'
              component={CalendarScreen}
              sceneStyle={{ paddingTop: 54 }}
            />
            <Scene
              key='hoursScreen'
              component={HoursScreen}
              title='Your calendar is here.'
              sceneStyle={{ paddingTop: 54 }}
            />
            <Scene
              key='meetingsScreen'
              component={MeetingsScreen}
              sceneStyle={{ paddingTop: 54 }}
            />
            <Scene
              key='meetingDetailsScreen'
              component={MeetingDetailsScreen}
              title='Meeting details'
              sceneStyle={{ paddingTop: 54 }}
            />
            <Scene
              key='editMeetingForm'
              component={EditMeetingForm}
              title='Edit'
              sceneStyle={{ paddingTop: 54 }}
              onRight={() => { console.log('Save changes') }}
              rightTitle='Save'
              leftButtonIconStyle={Styles.leftButton}
              leftTitle='Cancel'
            />
            <Scene
              key='sentInvitationsScreen'
              component={SentInvitationsScreen}
              sceneStyle={{ paddingTop: 54 }}
            />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter

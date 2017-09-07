import React, { Component } from 'react'
import { ScrollView, Image, BackHandler } from 'react-native'
import styles from './Styles/DrawerContentStyles'
import { Images } from '../Themes'
import { Actions } from 'react-native-router-flux'
import MenuItem from '../Components/MenuItem.js'
import Icon from 'react-native-vector-icons/FontAwesome'

import LoginActions from '../Redux/LoginRedux'

import { connect } from 'react-redux'

class DrawerContent extends Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
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

  handlePressLogout = () => {
    this.props.attemptLogout()
  };

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.pattern1} style={styles.logo} />

        <MenuItem
          onPress={() => {
            Actions.launchScreen()
            this.context.drawer.close()
          }}
        >
          Home
        </MenuItem>

        <MenuItem
          onPress={() => {
            Actions.calendarScreen()
            this.context.drawer.close()
          }}
        >
          <Icon name='calendar' size={20} style={styles.iconStyle} />
          &nbsp;&nbsp; Calendar
        </MenuItem>

        <MenuItem
          onPress={() => {
            Actions.meetingsScreen()
            this.context.drawer.close()
          }}
        >
          <Icon name='calendar-o' size={20} style={styles.iconStyle} />
          &nbsp;&nbsp; Meetings
        </MenuItem>

        <MenuItem
          onPress={() => {
            Actions.sentInvitationsScreen()
            this.context.drawer.close()
          }}
        >
          <Icon name='send' size={20} style={styles.iconStyle} />
          &nbsp;&nbsp; Sent Invitations
        </MenuItem>

        <MenuItem
          onPress={() => {
            Actions.receivedInvitationsScreen()
            this.context.drawer.close()
          }}
        >
          <Icon name='send-o' size={20} style={styles.iconStyle} />
          &nbsp;&nbsp; Received Invitations
        </MenuItem>

        <MenuItem
          onPress={() => {
            Actions.profileScreen()
            this.context.drawer.close()
          }}
        >
          <Icon name='user' size={20} style={styles.iconStyle} />
          &nbsp;&nbsp; Profile
        </MenuItem>

        <MenuItem
          onPress={() => {
            this.handlePressLogout()
            Actions.loginScreen()
            this.context.drawer.close()
          }}
        >
          <Icon name='user-o' size={17} style={styles.iconStyle} />
          &nbsp;&nbsp; Logout
        </MenuItem>
      </ScrollView>
    )
  }
}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

const mapDispatchToProps = dispatch => {
  return {
    attemptLogout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(null, mapDispatchToProps)(DrawerContent)

import React from 'react'
import {
  ScrollView,
  ToastAndroid,
  View,
  Text,
  Switch,
  KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import UserActions from '../Redux/UserRedux'

// Styles
import styles from './Styles/SettingsScreenStyle'

class SettingsScreen extends React.Component {
  constructor () {
    super()

    this.handlePushNotificationSwitch = this.handlePushNotificationSwitch.bind(this)
    this.handleEmailNotificationSwitch = this.handleEmailNotificationSwitch.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.error) {
      ToastAndroid.showWithGravity(
        newProps.error,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      )
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.row}>
            <Text style={styles.boldLabel}>
              Send me email notifications
            </Text>
            <Switch
              onValueChange={this.handleEmailNotificationSwitch}
              value={this.props.user.email_opt_in}
            />
          </View>

          <Text />

          <View style={styles.row}>
            <Text style={styles.boldLabel}>
              Send me push notifications
            </Text>
            <Switch
              onValueChange={this.handlePushNotificationSwitch}
              value={this.props.user.push_opt_in}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

  handleEmailNotificationSwitch (value) {
    this.props.updateUser(this.props.userId, { user: { email_opt_in: value } })
  }

  handlePushNotificationSwitch (value) {
    this.props.updateUser(this.props.userId, { user: { push_opt_in: value } })
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.login.userId,
    user: state.user.user,
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userId, userParams) => dispatch(
      UserActions.updateUserRequest(userId, userParams)
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)

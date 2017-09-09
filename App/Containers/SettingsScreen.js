import React from 'react'
import { ScrollView, View, Text, Switch, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SettingsScreenStyle'

class SettingsScreenScreen extends React.Component {
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
            />
          </View>

          <Text />

          <View style={styles.row}>
            <Text style={styles.boldLabel}>
              Send me push notifications
            </Text>
            <Switch
              onValueChange={this.handlePushNotificationSwitch}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

  handleEmailNotificationSwitch (value) {

  }

  handlePushNotificationSwitch (value) {

  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreenScreen)

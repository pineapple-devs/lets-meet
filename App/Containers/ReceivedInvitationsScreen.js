import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'

// Styles
import styles from './Styles/ReceivedInvitationsScreenStyle'

class ReceivedInvitationsScreen extends React.Component {

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>ReceivedInvitationsScreen Screen</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

export default ReceivedInvitationsScreen

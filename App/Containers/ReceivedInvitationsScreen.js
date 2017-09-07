import React from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'

// Styles
import styles from './Styles/ReceivedInvitationsScreenStyle'
import ReceivedInvitationsListView from './ReceivedInvitationsListView'

class ReceivedInvitationsScreen extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <ReceivedInvitationsListView />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

export default ReceivedInvitationsScreen

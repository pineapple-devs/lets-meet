import React from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'

// Styles
import styles from './Styles/SentInvitationsScreenStyle'

import SentInvitationsListView from './SentInvitationsListView'

class SentInvitationsScreen extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <SentInvitationsListView />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

export default SentInvitationsScreen

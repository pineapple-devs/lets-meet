import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import MeetingListView from './MeetingListView.js'
import AddNewMeetingButton from './Buttons/AddNewMeetingButton.js'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainView}>
        <ScrollView>
          <View style={styles.logoSection}>
            <Image source={Images.handshake} style={styles.logo} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionText}>
              {
                'Hi there, welcome to LetsMeet! This application will make it easy for you to arrange meetings with other people! \n \n Your meetings are below'
              }
            </Text>
          </View>
          <View />

          <View style={styles.meetings}>
            <MeetingListView />
          </View>
        </ScrollView>
        <AddNewMeetingButton />
      </View>
    )
  }
}

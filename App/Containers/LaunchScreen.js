import React from 'react'
import { ScrollView, Text, Image, View, StyleSheet } from 'react-native'
import CalendarButton from '../Containers/Buttons/CalendarButton.js'
import MeetingListView from './MeetingListView.js'
import { Actions } from 'react-native-router-flux';

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              {'Hi there, welcome to LetsMeet application. This app will make it easy for you to arrange meetings with people!'}
            </Text>
            <Text onPress={Actions.calendarScreen} style={{color: 'white'}}>This is CallendarScreen!</Text>
          </View>
          <View />

          <CalendarButton />

          <View>
            <Text style={styles.sectionText}>
              {'Your meetings are below'}
            </Text>

            <MeetingListView />
          </View>
        </ScrollView>
      </View>
    )
  }
}

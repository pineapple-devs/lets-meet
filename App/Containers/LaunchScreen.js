import React from 'react'
import { ScrollView, Text, Image, View, StyleSheet } from 'react-native'
import CalendarButton from '../Containers/Buttons/CalendarButton.js'
import MeetingListView from './MeetingListView.js'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainView}>

        <ScrollView >
           <Icon name="meetup" size={100} style={{alignSelf: 'center', paddingTop: 15, paddingBottom: 15}} color="snow" />

          <View style={styles.section, {backgroundColor: '#8e8e8e'}} >
            <Text style={styles.sectionText}>
              {'Hi there, welcome to LetsMeet application. This app will make it easy for you to arrange meetings with people!'}
            </Text>
          </View>
          <View />

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

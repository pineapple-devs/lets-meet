import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import GoToScheduleButton from '../Containers/LaunchScreen/GoToScheduleButton.js'

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
          </View>
          <View />

          <GoToScheduleButton />
        </ScrollView>
      </View>
    )
  }
}

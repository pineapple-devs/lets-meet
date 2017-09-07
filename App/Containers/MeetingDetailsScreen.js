import React from 'react'
import {
  ScrollView,
  Text,
  TouchableHighlight
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Moment from 'moment'

// Styles
import styles from './Styles/MeetingDetailsScreenStyles'

export default class LaunchScreen extends React.Component {
  state = {
    modalVisible: false
  };

  setModalVisible (visible) {
    this.setState({ modalVisible: visible })
  }

  render () {
    Moment.locale('en')
    var startTime = this.props.meetingData.startTime
    var endTime = this.props.meetingData.endTime
    return (
      <ScrollView keyboardShouldPersistTaps='always' style={styles.mainView}>
        <Text style={styles.text}>What?</Text>
        <Text style={styles.boldLabel}>{this.props.meetingData.title}</Text>
        <Text style={styles.text}>Explain?</Text>
        <Text style={styles.boldLabel}>{this.props.meetingData.description}</Text>
        <Text style={styles.text}>When?</Text>
        <Text style={styles.boldTime}>From &nbsp;{Moment(startTime).format('MMM d, YYYY HH:mm')}h</Text>
        <Text style={styles.boldLabel}>To &nbsp;{Moment(endTime).format('MMM d, YYYY HH:mm')}h</Text>

        <Text style={styles.text}>Who else is going?</Text>

        <TouchableHighlight
          underlyingColor='#cfcfcf'
          style={styles.editButtonTH}
          onPress={() =>
            Actions.editMeetingForm({ meetingData: this.props.meetingData })
          }
        >
          <Icon name='edit' size={30} color='#004c40' />
        </TouchableHighlight>

      </ScrollView>
    )
  }
}

import React from 'react'
import {
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  Alert
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import dateFormat from 'dateformat'
import InvitationActions from '../Redux/InvitationRedux'
import MeetingActions from '../Redux/MeetingRedux'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/MeetingDetailsScreenStyles'

class MeetingDetailsScreen extends React.Component {
  constructor () {
    super()

    this.showAlert = this.showAlert.bind(this)
  }

  componentDidMount () {
    const userId = this.props.userId
    const meetingId = this.props.meetingData.meeting_id
    if (!this.props.fetching) {
      this.props.fetchMeetings(userId, meetingId)
    }
  }

  showAlert () {
    const userId = this.props.userId
    const meetingId = this.props.meetingData.meeting_id

    Alert.alert(
      'Are you sure you want to delete this meeting?',
      '',
      [
        { text: 'Cancel', onPress: () => Actions.pop, style: 'cancel' },
        {
          text: 'OK',
          onPress: () => this.handleDestroyMeeting(userId, meetingId)
        }
      ],
      { cancelable: true }
    )
  }

  handleDestroyMeeting (userId, meetingId) {
    this.props.destroyMeeting(userId, meetingId)
    Actions.pop()
    Actions.meetingsScreen()
  }

  render () {
    var startTime = this.props.meetingData.start_time
    var endTime = this.props.meetingData.end_time
    return (
      <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps='always' style={styles.mainView}>
          <Text style={styles.text}>What?</Text>
          <Text style={styles.boldLabel}>{this.props.meetingData.title}</Text>
          <Text style={styles.text}>Explain?</Text>
          <Text style={styles.boldLabel}>
            {this.props.meetingData.description}
          </Text>
          <Text style={styles.text}>When?</Text>

          <Text style={styles.boldDate}>
            {dateFormat(startTime, 'dddd, mmmm dS, yyyy')}
            {new Date(startTime).toLocaleDateString() ===
            new Date(endTime).toLocaleDateString() ? (
              ''
            ) : (
              dateFormat(endTime, ' - dddd, mmmm dS, yyyy')
            )}
          </Text>
          <Text style={styles.boldTime}>
            From {dateFormat(startTime, 'h:MM TT ')}
            to {dateFormat(endTime, 'h:MM TT')}
          </Text>

          <Text style={styles.text}>Where?</Text>
          <Text style={styles.boldLabel}>
            {this.props.meetingData.location ? (
              this.props.meetingData.location
            ) : (
              'No location info, sorry.'
            )}
          </Text>

          {this.props.invitations && this.props.invitations.length > 0 && (
            <Text style={styles.text}>Who else is going?</Text>
          )}
          {this.props.invitations &&
            this.props.invitations.map(invitation => (
              <Text style={styles.boldPeople} key={invitation.email}>
                <Icon name='user' size={13} /> &nbsp;{invitation.email}
              </Text>
            ))}
        </ScrollView>
        <View style={styles.footer}>
          <TouchableHighlight
            underlyingColor='#cfcfcf'
            style={styles.editButtonTH}
            onPress={() =>
              Actions.editMeetingForm({
                meetingData: this.props.meetingData
              })}
          >
            <Icon
              name='edit'
              size={35}
              color='#004c40'
              style={{ alignSelf: 'flex-end' }}
            />
          </TouchableHighlight>

          <TouchableHighlight
            underlyingColor='#cfcfcf'
            style={styles.deleteButtonTH}
            onPress={() => this.showAlert()}
          >
            <Icon name='trash-o' size={35} color='#004c40' />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.invitation.fetching,
    invitations: state.invitation.meetingInvitations,
    userId: state.login.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMeetings: (userId, meetingId) =>
      dispatch(
        InvitationActions.fetchSentInvitationsByMeeting(userId, meetingId)
      ),
    destroyMeeting: (userId, meetingId) =>
      dispatch(MeetingActions.destroyMeetingRequest(userId, meetingId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  MeetingDetailsScreen
)

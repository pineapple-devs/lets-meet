import React from 'react'
import {View, Text, ListView} from 'react-native'
import {connect} from 'react-redux'
import InvitationsActions from '../Redux/InvitationRedux'
import RoundedButton from '../Components/RoundedButton'
import Moment from 'moment'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/ListviewExampleStyles'

class ReceivedInvitationsListView extends React.Component {
  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds
    }

    this.renderRow = this.renderRow.bind(this)
  }

  renderRow (rowData) {
    const invitationId = rowData.id
    const meetingId = rowData.meeting.id
    const userId = rowData.user.id
    const name = rowData.user.name
    const meetingTitle = rowData.meeting.title
    const meetingDescription = rowData.meeting.description
    const startDate = Moment(rowData.meeting.start_date).format('MMM d, YYYY HH:mm')
    const endDate = Moment(rowData.meeting.end_date).format('MMM d, YYYY HH:mm')
    const accepted = rowData.accepted

    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>
          {name} invited you to {meetingTitle}
        </Text>
        {meetingDescription &&
        <Text style={styles.label}>
          Description: {meetingDescription}
        </Text>
        }
        <Text style={styles.label}>
          From &nbsp;{startDate}h
        </Text>
        <Text style={styles.label}>
          To &nbsp;{endDate}h
        </Text>
        {accepted === null &&
          <View>
            <RoundedButton
              text='Accept'
              onPress={() => this.handleAccept(userId, meetingId, invitationId)}
            />
            <RoundedButton
              text='Decline'
              onPress={() => this.handleDecline(userId, meetingId, invitationId)}
            />
          </View>
        }
        <Text style={styles.label}>
          {accepted === true && 'You have accepted! Yay!'}
          {accepted === false && 'You have cancelled. Bummer.'}
        </Text>
      </View>
    )
  }

  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  componentDidMount () {
    const userId = this.props.userId
    if (!this.props.fetching) {
      this.props.fetchReceivedInvitations(userId)
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.receivedInvitations) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.receivedInvitations)
      })
    }
  }

  handleAccept (userId, meetingId, invitationId) {
    this.props.updateInvitationAccepted(userId, meetingId, invitationId, true)
  }

  handleDecline (userId, meetingId, invitationId) {
    this.props.updateInvitationAccepted(userId, meetingId, invitationId, false)
  }

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage
          title='Nothing to see here, Move along'
          show={this.noRowData()}
        />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          pageSize={15}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.invitation.fetching,
    receivedInvitations: state.invitation.receivedInvitations,
    userId: state.login.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReceivedInvitations: userId => dispatch(
      InvitationsActions.fetchReceivedInvitations(userId)
    ),
    updateInvitationAccepted: (userId, meetingId, invitationId, accepted) => dispatch(
      InvitationsActions.updateInvitationAccepted(userId, meetingId, invitationId, accepted)
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedInvitationsListView)

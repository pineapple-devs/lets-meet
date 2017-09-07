import React from 'react'
import {View, Text, ListView, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import InvitationsActions from '../Redux/InvitationRedux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/ListviewExampleStyles'

class SentInvitationsListView extends React.Component {
  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds
    }
  }

  renderRow (rowData) {
    return (
      <TouchableOpacity onPress={() => console.log(rowData)}>
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{rowData.email}</Text>
          <Text style={styles.label}>They have accepted</Text>
          <Text style={styles.label} />
        </View>
      </TouchableOpacity>
    )
  }

  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  componentDidMount () {
    const userId = this.props.userId
    if (!this.props.fetching) {
      this.props.fetchSentInvitations(userId)
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.sentInvitations) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.sentInvitations)
      })
    }
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
    sentInvitations: state.invitation.sentInvitations,
    userId: state.login.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSentInvitations: userId => dispatch(InvitationsActions.fetchSentInvitations(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SentInvitationsListView)

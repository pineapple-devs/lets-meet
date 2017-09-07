import React from 'react'
import {View, Text, ListView, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import InvitationsActions from '../Redux/InvitationRedux'

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
  }

  renderRow (rowData) {
    return (
      <TouchableOpacity onPress={() => console.log(rowData)}>
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{rowData.email}</Text>
          <Text style={styles.label}>
            {rowData.accepted === null && "They haven't answered yet."}
            {rowData.accepted === true && 'They have accepted! Yay!'}
            {rowData.accepted === false && 'They have cancelled. Bummer.'}
          </Text>
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
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedInvitationsListView)

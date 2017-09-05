import React from 'react'
import {View, Text, ListView, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import MeetingActions from '../Redux/MeetingRedux'
import dateFormat from 'dateformat'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/ListviewExampleStyles'

class MeetingListView extends React.Component {
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
          <Text style={styles.boldLabel}>{rowData.title}</Text>
          <Text style={styles.label}>
            {dateFormat(rowData.start_time, 'dd.mm.yyyy')}
            {new Date(rowData.start_time).toLocaleDateString() ===
            new Date(rowData.end_time).toLocaleDateString() ? (
              ''
            ) : (
              dateFormat(rowData.end_time, ' - dd.mm.yyyy')
            )}
          </Text>
          <Text style={styles.label}>
            {dateFormat(rowData.start_time, 'HH:MM - ')}
            {dateFormat(rowData.end_time, 'HH:MM')}
          </Text>
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
      this.props.fetchMeetings(userId)
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.intervals) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.intervals)
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
    fetching: state.meeting.fetching,
    intervals: state.meeting.intervals,
    userId: state.login.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMeetings: userId => dispatch(MeetingActions.fetchMeetings(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingListView)

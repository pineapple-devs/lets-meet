import React from 'react'
import { View, Text, ListView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import MeetingActions from '../Redux/MeetingRedux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/ListviewExampleStyles'

class MeetingListView extends React.Component {
  constructor (props) {
    super(props)
    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
    /*const dataObjects = [
      {title: 'Gym with Djoka', description: 'Get SWOLE'},
      {title: 'Running with Marko', description: 'Get RIPPED'},
      {title: 'Hookah with Nemanja', description: 'Smoke some'},
      {title: 'Study', description: 'Get SMART'},
      {title: 'Work', description: 'Level up quickly'}
    ]*/

    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds
    }
  }

  /* ***********************************************************
  * STEP 3
  * `renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} description={rowData.description} />
  *************************************************************/
  renderRow (rowData) {
    var dateFormat = require('dateformat')
    return (
      <TouchableOpacity onPress={() => console.log(rowData)}>
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{rowData.title}</Text>
          <Text style={styles.label}>{dateFormat(rowData.start_time, 'dd.mm.yyyy')}{new Date(rowData.start_time).toLocaleDateString()==new Date(rowData.end_time).toLocaleDateString() ? '':dateFormat(rowData.end_time, ' - dd.mm.yyyy')}</Text>
          <Text style={styles.label}>{dateFormat(rowData.start_time, 'HH:MM - ')}{dateFormat(rowData.end_time, 'HH:MM')}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
    componentWillReceiveProps (newProps) {
      if (newProps.someData) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newProps.someData)
        })
      }
    }
  *************************************************************/

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  componentDidMount () {
      const userId = 1 // nikolalsvk
      this.props.fetchMeetings(userId)
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
        <AlertMessage title='Nothing to See Here, Move Along' show={this.noRowData()} />
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

const mapStateToProps = (state) => {
  return {
    fetching: state.meeting.fetching,
    intervals: state.meeting.intervals
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMeetings: (userId) => dispatch(MeetingActions.fetchMeetings(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingListView)

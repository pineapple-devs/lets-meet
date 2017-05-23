import React from 'react'
import { View, Text, ListView } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../Themes/'
import MeetingActions from '../Redux/MeetingRedux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/ListviewExampleStyles'

class HourListView extends React.Component {
  constructor (props) {
    super(props)
    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    * USING IT FROM REDUX
    *************************************************************/

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
    const events = [
      {title: 'Event2', startDate: '19 May 2017 02:30', endDate: '19 May 2017 03:10'},
      {title: 'Event1', startDate: '19 May 2017 05:00', endDate: '19 May 2017 05:30'},
      {title: 'Event3', startDate: '19 May 2017 07:45', endDate: '19 May 2017 09:25'}
    ]
    var dateHour = new Date('19 May 2017 ' + rowData.title)
    var dateHour1 = new Date(dateHour)
    dateHour1.setHours(dateHour.getHours() + 1)
    var event = <View style={{flex: 1, height: 50, backgroundColor: Colors.backgroundColor, borderTopColor: 'white', borderTopWidth: 1}} />
    for (var i = 0; i < events.length; i++) {
      var startTime = new Date(events[i].startDate)
      var endTime = new Date(events[i].endDate)
      var startMinutes = startTime.getMinutes() / 60 * 100    // koliko minuta u procentima treba od pocetka sata do pocetka eventa. Npr za 15 min start minutes ces biti 25 %
      var endMinutes = 100 - endTime.getMinutes() / 60 * 100    // procenti od kraja eventa do pocetka novog sata. Za 45 end minutes ce biti 15 do novog sata tj 25 %

      if (startTime.getTime() <= dateHour.getTime()) {
        if (endTime.getTime() > dateHour.getTime()) {
          if (endTime.getTime() < dateHour1.getTime()) {
            event =
              <View style={{flex: 1, height: 50, backgroundColor: Colors.backgroundColor, borderTopColor: 'white', borderTopWidth: 1}}>
                <View style={{flex: 100 - endMinutes, height: 50, backgroundColor: 'red', opacity: 0.5}} />
                <View style={{flex: endMinutes, height: 50, backgroundColor: Colors.backgroundColor}} />
              </View>
          } else {
            event =
              <View style={{flex: 1, height: 50, backgroundColor: Colors.backgroundColor, borderTopColor: 'white', borderTopWidth: 1}}>
                <View style={{flex: 1, height: 50, backgroundColor: 'red', opacity: 0.5}} />
              </View>
          }
        }
      } else {
        if (startTime.getTime() < dateHour1.getTime()) {
          if (endTime.getTime() >= dateHour1.getTime()) {
            event =
              <View style={{flex: 1, height: 50, backgroundColor: Colors.backgroundColor, borderTopColor: 'white', borderTopWidth: 1}}>
                <View style={{flex: startMinutes, height: 50, backgroundColor: Colors.backgroundColor}} />
                <View style={{flex: 100 - startMinutes, height: 50, backgroundColor: 'red', opacity: 0.5}} />
              </View>
          } else {
            event =
              <View style={{flex: 1, height: 50, backgroundColor: Colors.backgroundColor, borderTopColor: 'white', borderTopWidth: 1}}>
                <View style={{flex: startMinutes, height: 50, backgroundColor: Colors.backgroundColor}} />
                <View style={{flex: 100 - startMinutes - endMinutes, height: 50, backgroundColor: 'red', opacity: 0.5}} />
                <View style={{flex: endMinutes, height: 50, backgroundColor: Colors.backgroundColor}} />
              </View>
          }
        }
      }
    }
    return (
      <View style={{flex: 1, alignItems: 'stretch', flexDirection: 'row'}}>
        <View style={{height: 50, backgroundColor: Colors.backgroundColor, justifyContent: 'center'}}>
          <Text style={styles.label}>{rowData.title}</Text>
        </View>
        {event}
      </View>
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
    if (newProps.meetings) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.meetings)
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
    meetings: state.meeting.meetings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMeetings: (userId) => dispatch(MeetingActions.fetchMeetings(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HourListView)

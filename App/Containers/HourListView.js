import React from 'react'
import { View, Text, ListView, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import MeetingActions from '../Redux/MeetingRedux'
import Images from '../Themes/Images'

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
    global.date = this.props.date
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
    // meeting ne moraju biti sortirani, nema iscrtavanja praznih view-ova
    // radi i za eventove koji pocinju u jednom a zavrsavaju u drugom danu
    var startTime = new Date(rowData.start_time)
    var endTime = new Date(rowData.end_time)
    console.log('Start time: ' + startTime + ' - End time: ' + endTime)

    var dif = (startTime.getTime() - this.date.getTime()) / 3600000 + 2 // + 2 zbog vremenske zone
    var event = (endTime.getTime() - startTime.getTime()) / 3600000
    console.log(this.date)
    // 58 je visina jednog sata, odnosno visina izmedju dvije iscrtane linije na pozadniskoj slici
    // dif je start time u satima, npr za 15:30 dif je 15.5 -> dif * visina jednog sata odvaja tacno do pocetka meetinga
    // isto za event * 58 -> trajanje meetinga
    return (
      <View style={{backgroundColor: 'rgba(250,0,0,0.2)', position: 'absolute', height: event * 58, top: dif * 58, left: 0, right: 0}}><Text>{rowData.title}</Text></View>
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
    const userId = this.props.userId
    this.props.fetchMeetings(userId)
  }

  componentWillReceiveProps (newProps) {
    global.date = newProps.date
    if (newProps.intervals) {
      var newIntervals = []
      var tomorrow = new Date(newProps.date.getFullYear(), newProps.date.getMonth(), newProps.date.getDate() + 1)
      var start
      var end
      for (var i = 0; i < newProps.intervals.length; i++) {
        start = new Date(newProps.intervals[i].start_time)
        end = new Date(newProps.intervals[i].end_time)
        if (start >= newProps.date && start < tomorrow) { newIntervals.push(newProps.intervals[i]) } else if (end > newProps.date && end <= tomorrow) {
          newIntervals.push(newProps.intervals[i])
        } else if (start < newProps && end > tomorrow) {
          newIntervals.push(newProps.intervals[i])
        }
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newIntervals)
      })
    } else console.log(newProps.intervals)
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.hours} style={styles.backgroundImage}>
          <AlertMessage title='Nothing to See Here, Move Along' show={this.noRowData()} />
          <ListView
            contentContainerStyle={styles.listContainerContent}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            pageSize={15}
          />
        </Image>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.meeting.fetching,
    intervals: state.meeting.intervals,
    userId: state.login.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMeetings: (userId) => dispatch(MeetingActions.fetchMeetings(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HourListView)

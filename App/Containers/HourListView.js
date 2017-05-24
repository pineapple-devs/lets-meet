import React from 'react'
import { View, Text, ListView, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../Themes/'
import MeetingActions from '../Redux/MeetingRedux'
import { Images } from '../Themes/'

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
    const dataObjects = [
          {title: 'Event2', startDate: '19 May 2017 00:00', endDate: '19 May 2017 03:10'},
          {title: 'Event1', startDate: '19 May 2017 05:00', endDate: '19 May 2017 06:00'},
          {title: 'Event3', startDate: '19 May 2017 07:00', endDate: '19 May 2017 09:00'},
          {title: 'Event3', startDate: '19 May 2017 22:00', endDate: '20 May 2017 00:00'}
    ]

    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})
    global.lastEnd = new Date('25 May 2017 00:00')
    global.numOfEvents = dataObjects.length
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
    var startTime = new Date(rowData.start_time)
    var endTime = new Date(rowData.end_time)
    var dif = startTime.getTime() - this.lastEnd.getTime()
    dif = dif / (1000 * 60) - 2
    dif = dif / 24 / 60 * 100
    var event = endTime.getTime() - startTime.getTime()
    event = event / (1000 * 60)
    event = event / 24 / 60 * 100
    this.lastEnd = endTime
    this.numOfEvents--
    if (this.numOfEvents === 0) {
      var end = new Date('25 May 2017 00:00')
      end = end.getTime() - endTime.getTime()
      end = end / (1000 * 60) - 2
      end = end / 24 / 60 * 100
      return (
        <View style={{flex: dif + event + end}}>
          <View style={{flex: dif, opacity: 0.1}} />
          <Text style={{flex: event, backgroundColor: 'rgba(255,0,0,0.2)'}}>{rowData.title}</Text>
          <View style={{flex: end, opacity: 0.1}} />
        </View>
      )
    } else {
      return (
        <View style={{flex: dif + event}}>
          <View style={{flex: dif, opacity: 0.4}} />
          <Text style={{flex: event, backgroundColor: 'rgba(255,0,0,0.2)'}}>{rowData.title}</Text>
        </View>
      )
    }
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
    intervals: state.meeting.intervals
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMeetings: (userId) => dispatch(MeetingActions.fetchMeetings(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HourListView)

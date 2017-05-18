import React from 'react'
import { View, Text, ListView } from 'react-native'
import { connect } from 'react-redux'
import { Metrics, Colors } from '../Themes/'

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
    *************************************************************/
    const dataObjects = [
          {title: '00:00', description: 'First Description'},
          {title: '01:00', description: 'Second Description'},
          {title: '02:00', description: 'Third Description'},
          {title: '03:00', description: 'Fourth Description'},
          {title: '04:00', description: 'Fifth Description'},
          {title: '05:00', description: 'Sixth Description'},
          {title: '06:00', description: 'Seventh Description'},
          {title: '07:00', description: 'Eighth Description'},
          {title: '08:00', description: 'Ninth Description'},
          {title: '09:00', description: 'Tenth Description'},
          {title: '10:00', description: 'Eleventh Description'},
          {title: '11:00', description: '12th Description'},
          {title: '12:00', description: '13th Description'},
          {title: '13:00', description: '14th Description'},
          {title: '14:00', description: '15th Description'},
          {title: '15:00', description: '16th Description'},
          {title: '16:00', description: '17th Description'},
          {title: '17:00', description: '18th Description'},
          {title: '18:00', description: '19th Description'},
          {title: '19:00', description: '20th Description'},
          {title: '20:00', description: 'Description'},
          {title: '21:00', description: 'Description'},
          {title: '22:00', description: 'Description'},
          {title: '23:00', description: 'Description'}
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

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects)
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
    return (
      <View style={{flex: 1, alignItems: 'stretch', flexDirection: 'row'}}>
        <View style={{height: 50, backgroundColor: Colors.backgroundColor, marginVertical: Metrics.smallMargin, justifyContent: 'center'}}>
          <Text style={styles.label}>{rowData.title}</Text>
        </View>
        <View style={{flex: 1, height: 50, backgroundColor: Colors.backgroundColor, marginVertical: Metrics.smallMargin, borderTopColor: 'white', borderTopWidth: 1}} />
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
    // ...redux state to props here
  }
}

export default connect(mapStateToProps)(HourListView)

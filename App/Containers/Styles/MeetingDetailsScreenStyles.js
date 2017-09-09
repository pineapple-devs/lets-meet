import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

var {height, width} = Dimensions.get('window')

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainView: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    width: width
  },
  text: {
    textAlign: 'center'
  },
  editButtonTH: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
    width: 35,
    height: 35,
    marginRight: 4
  },
  deleteButtonTH: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
    width: 35,
    height: 35,
    marginLeft: 4,
    marginBottom: 4
  },
  boldLabel: {
    fontWeight: 'bold',
    color: '#004c40',
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: Metrics.smallMargin,
    marginBottom: 20
  },
  boldDate: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#004c40',
    textAlign: 'center',
    marginVertical: Metrics.smallMargin
  },
  boldTime: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#004c40',
    textAlign: 'center',
    marginVertical: Metrics.smallMargin,
    marginBottom: 20
  },
  footer: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

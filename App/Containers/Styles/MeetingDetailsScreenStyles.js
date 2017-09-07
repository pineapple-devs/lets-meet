import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

var width = Dimensions.get('window').width

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainView: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    height: 200,
    backgroundColor: 'white',
    alignSelf: 'center',
    width: width * 0.7
  },
  text: {
    textAlign: 'center'
  },

  editButtonTH: {
    marginTop: 20,
    width: 30

  },
  boldLabel: {
    fontWeight: 'bold',
    color: '#004c40',
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: Metrics.smallMargin,
    marginBottom: 20
  },
  boldTime: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#004c40',
    textAlign: 'center',
    marginVertical: Metrics.smallMargin
  }

})

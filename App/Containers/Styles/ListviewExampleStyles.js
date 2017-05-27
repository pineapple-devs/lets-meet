import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  listContainerContent: {
    flex: 1,
    marginTop: 11,
    marginBottom: 20,
    marginLeft: 50
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginVertical: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: 'black',
    marginBottom: Metrics.smallMargin
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover' // or 'stretch'
  }
})

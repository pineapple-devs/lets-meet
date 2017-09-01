import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  listContainerContent: {
    flex: 1,
    marginTop: 11,
    marginBottom: 20,
    marginLeft: 50
  },
  row: {
    flex: 1,
    backgroundColor: 'rgba(72, 169, 153, 0.2)',
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'black',
    textAlign: 'center',
    marginVertical: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: Metrics.smallMargin
  },
  listContent: {
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover' // or 'stretch'
  }
})

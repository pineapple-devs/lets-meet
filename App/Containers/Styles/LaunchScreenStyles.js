import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    alignSelf: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    width: 330,
    height: 180
  },
  centered: {
    alignItems: 'center'
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#007769'
  },
  section: {
    paddingTop: 10,
    paddingBottom: 10
  },
  logoSection: {
    backgroundColor: 'white'
  },
  sectionText: {
    color: 'white',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
})

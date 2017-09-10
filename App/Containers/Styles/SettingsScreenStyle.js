import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'black',
    textAlign: 'center'
  }
})

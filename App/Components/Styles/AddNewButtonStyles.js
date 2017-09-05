import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  addButton: {
    backgroundColor: '#00796b',
    borderColor: '#707070',
    borderWidth: 1,
    height: 70,
    width: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  calendarButton: {
    backgroundColor: 'transparent',
    borderColor: '#696969',
    borderWidth: 1,
    height: 80,
    width: 80,
    borderRadius: 50,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
})

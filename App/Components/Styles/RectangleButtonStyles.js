import {StyleSheet} from 'react-native'
import {Fonts, Colors, Metrics} from '../../Themes/'

export default StyleSheet.create({
  buttonSubmit: {
    height: 40,
    width: 130,
    borderRadius: 0,
    borderColor: '#696969',
    borderWidth: 1,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: '#378834',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonCancel: {
    height: 40,
    width: 130,
    borderRadius: 0,
    borderColor: '#696969',
    borderWidth: 1,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: '#c0241b',
    justifyContent: 'center',
    alignSelf: 'center'
  },

  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  }
})

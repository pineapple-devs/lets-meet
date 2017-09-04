import { StyleSheet, Dimensions } from "react-native";
import { Metrics, ApplicationStyles } from "../../Themes/";

var width = Dimensions.get('window').width;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainView: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    height: 200,
    backgroundColor: "yellow",
    alignSelf: "center",
    width: width * .7
  },
  text: {
    textAlign: "center"
  },

  editButtonTH: {
    marginTop: 20,
    width: 25

  }

});
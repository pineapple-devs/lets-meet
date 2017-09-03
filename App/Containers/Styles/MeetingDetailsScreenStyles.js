import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles } from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainView: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    height: 200,
    backgroundColor: "yellow",
    alignSelf: "center"
  },
  text: {
    textAlign: "center"
  }
});

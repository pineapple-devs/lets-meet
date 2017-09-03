import React from "react";
import { ScrollView, Text, Image, View, StyleSheet } from "react-native";
import CalendarButton from "../Containers/Buttons/CalendarButton.js";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";

import { Images } from "../Themes";

// Styles
import styles from "./Styles/MeetingDetailsScreenStyles";

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.mainView}>
        <Text style={styles.text}>{this.props.meetingData.title}</Text>
        <Text style={styles.text}>{this.props.meetingData.description}</Text>
      </ScrollView>
    );
  }
}

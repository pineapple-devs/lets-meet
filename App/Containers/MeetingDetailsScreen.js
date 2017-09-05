import React from "react";
import {
  ScrollView,
  Text,
  Image,
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Dimensions
} from "react-native";
import CalendarButton from "../Containers/Buttons/CalendarButton.js";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
import { Images } from "../Themes";
import Moment from 'moment';

// Styles
import styles from "./Styles/MeetingDetailsScreenStyles";

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);
  }


  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    Moment.locale('en');
    var start_time = this.props.meetingData.start_time;
    var end_time = this.props.meetingData.end_time;
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.mainView}>
        <Text style={styles.text}>What?</Text>
        <Text style={styles.boldLabel}>{this.props.meetingData.title}</Text>
        <Text style={styles.text}>Explain?</Text>
        <Text style={styles.boldLabel}>{this.props.meetingData.description}</Text>
        <Text style={styles.text}>When?</Text>
        <Text style={styles.boldTime}>From &nbsp;{Moment(start_time).format('MMM d, YYYY HH:mm')}h</Text>
        <Text style={styles.boldLabel}>To &nbsp;{Moment(end_time).format('MMM d, YYYY HH:mm')}h</Text>


        <Text style={styles.text}>Who else is going?</Text>






        <TouchableHighlight underlyingColor='#cfcfcf' style={styles.editButtonTH} onPress={() => { Actions.editMeetingForm({meetingData : this.props.meetingData }) } }>
           <Icon name="edit" size={30} color='#004c40' />
        </TouchableHighlight>

      </ScrollView>
    );
  }
}

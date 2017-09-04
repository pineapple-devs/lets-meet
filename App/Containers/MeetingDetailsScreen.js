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
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.mainView}>
        <Text style={styles.text}>{this.props.meetingData.title}</Text>
        <Text style={styles.text}>{this.props.meetingData.description}</Text>
        <Text style={styles.text}>{this.props.meetingData.start_time}</Text>
        <Text style={styles.text}>{this.props.meetingData.end_time}</Text>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>


        <TouchableHighlight underlyingColor='#cfcfcf' style={styles.editButtonTH} onPress={() => {debugger; Actions.editMeetingForm({meetingData : this.props.meetingData }) } }>
           <Icon name="edit" size={25} />
        </TouchableHighlight>

      </ScrollView>
    );
  }
}

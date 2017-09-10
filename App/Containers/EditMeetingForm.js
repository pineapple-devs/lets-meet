import React, { Component } from "react";
import { connect } from "react-redux";
import MeetingActions from "../Redux/MeetingRedux";

import { Text, ScrollView, Button, TouchableHighlight } from "react-native";
import { DatePicker } from "react-native-ui-xg";
import { Actions as NavigationActions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  Form,
  InputField
} from 'react-native-form-generator'

export class AddMeetingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      startDate: this.props.meetingData.start_time,
      endDate: this.props.meetingData.end_time,
      showModal: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.meeting) {
      this.props.screenProps.toggle();
      NavigationActions.meetingsScreen();
    }
  }

  handleFormChange(formData) {
    this.setState({ formData: formData });
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  handleFormFocus(e, component) {
    // console.log(e, component);
  }

  handleSubmit() {
    // call API here and create meeting
    const formData = this.state.formData;
    const userId = this.props.userId;
    const startTime = this.state.startDate;
    const endTime = this.state.endDate;

    const meetingParams = {
      meeting: {
        title: formData.meetingName,
        description: formData.meetingDescription,
        user_id: userId
      },
      intervals: [{ start_time: startTime, end_time: endTime }]
    };

    this.props.createMeeting(userId, meetingParams);
  }

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{ paddingLeft: 10, paddingRight: 10, height: 200 }}
      >
        <Form
          ref="addAddMeetingForm"
          onFocus={this.handleFormFocus.bind(this)}
          onChange={this.handleFormChange.bind(this)}
          label="New Meeting"
        >
          <InputField ref="meetingName" value={this.props.meetingData.title} />

          <InputField
            multiline
            ref="meetingDescription"
            value={this.props.meetingData.description}
          />

          {/*
          DatePicker is not from react-native-form-generator package
          so we're not fetching it from ref. We're setting onDateChange
          function which will do setState({date: date})
          */}
          <Text>{"When will this meeting start?"}</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.startDate}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            minuteInterval={10}
            onDateChange={chosenDate => {
              this.setState({ startDate: chosenDate });
            }}
          />

          <Text>{"When will this meeting end?"}</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.endDate}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            minuteInterval={10}
            onDateChange={chosenDate => {
              this.setState({ endDate: chosenDate });
            }}
          />
        </Form>

        <Text>{JSON.stringify(this.state.formData)}</Text>
        <Text>{JSON.stringify(this.state.startDate)}</Text>
        <Text>{JSON.stringify(this.state.endDate)}</Text>

        <TouchableHighlight
          underlyingColor="#cfcfcf"
          style={{ alignSelf: "center" }}
          onPress={this.handleSubmit}
        >
          <Icon name="floppy-o" size={35} color="#004c40" />
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.meeting.fetching,
    userId: state.login.userId,
    meeting: state.meeting.meeting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createMeeting: (userId, meetingParams) => {
      return dispatch(MeetingActions.createMeeting(userId, meetingParams));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMeetingForm);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import MeetingActions from '../Redux/MeetingRedux';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Button,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../Components/Styles/RectangleButtonStyles';
import {DatePicker} from 'react-native-ui-xg';
import {Actions as NavigationActions} from 'react-native-router-flux';

import {
  Form,
  Separator,
  InputField,
  LinkField,
  SwitchField,
  PickerField,
} from 'react-native-form-generator';

export class NewMeetingForm extends React.Component {
  constructor(props) {
    super(props);

    const formData = {
      meetingName: '',
      meetingDescription: '',
      repeat: false,
    };

    const guests = [
      {text: 'Nikola <nikolaseap@gmail.com>', checked: false},
      {text: 'Jana <jana_vojnovic@hotmail.com>', checked: false},
      {text: 'Marina <marina_nenic@hotmail.com>', checked: false},
    ];

    this.state = {
      formData: {},
      startDate: new Date(),
      endDate: new Date(),
      guests: guests,
      showModal: false,
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
    this.setState({formData: formData});
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
        user_id: userId,
      },
      intervals: [{start_time: startTime, end_time: endTime}],
    };

    this.props.createMeeting(userId, meetingParams);
  }

  toggleGuest(toggledGuest) {
    const guests = this.state.guests.map(guest => {
      if (toggledGuest.name == guest.name) {
        guest.checked = !guest.checked;
      }

      return guest;
    });
  }

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{paddingLeft: 10, paddingRight: 10, height: 200}}>
        <Form
          ref="addNewMeetingForm"
          onFocus={this.handleFormFocus.bind(this)}
          onChange={this.handleFormChange.bind(this)}
          label="New Meeting">
          <InputField ref="meetingName" placeholder="Meeting name" />

          <InputField
            multiline={true}
            ref="meetingDescription"
            placeholder="Meeting description"
            helpText="Write down some special reminders for your meeting!"
          />

          <SwitchField
            label="Repeat"
            ref="repeat"
            helpText="Check if you want your meeting to repeat."
          />

          {this.state.formData.repeat && (
            <PickerField
              ref="repeatFrequency"
              label="Repeat settings"
              options={{
                every_day: 'Every day',
                every_week: 'Every week',
                every_month: 'Every month',
              }}
            />
          )}

          {/*
          DatePicker is not from react-native-form-generator package
          so we're not fetching it from ref. We're setting onDateChange
          function which will do setState({date: date})
          */}
          <Text>{'When will this meeting start?'}</Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.startDate}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            minuteInterval={10}
            onDateChange={chosenDate => {
              this.setState({startDate: chosenDate});
            }}
          />

          <Text>{'When will this meeting end?'}</Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.endDate}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            minuteInterval={10}
            onDateChange={chosenDate => {
              this.setState({endDate: chosenDate});
            }}
          />

          <Text>{'Having guests?'}</Text>

          {this.state.guests.map(guest => {
            <CheckBox
              rightText={guest.text}
              onClick={() => this.toggleGuest(guest)}
              isChecked={guest.checked}
            />;
          })}
        </Form>

        {/*
        <Text>{JSON.stringify(this.state.formData)}</Text>
        <Text>{JSON.stringify(this.state.startDate)}</Text>
        <Text>{JSON.stringify(this.state.endDate)}</Text>
        */}

        <Button
          icon="md-checkmark"
          iconPlacement="right"
          onPress={this.handleSubmit}
          title="Save">
          "Save"
        </Button>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.meeting.fetching,
    userId: state.login.userId,
    meeting: state.meeting.meeting,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createMeeting: (userId, meetingParams) => {
      return dispatch(MeetingActions.createMeeting(userId, meetingParams));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMeetingForm);

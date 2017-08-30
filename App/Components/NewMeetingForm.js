import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/RectangleButtonStyles';
import {DatePicker} from 'react-native-ui-xg';

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
    this.state = {
      formData: {},
      startDate: new Date(),
      endDate: new Date(),
      showModal: false,
    };
  }

  handleFormChange(formData) {
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
    meetingName:"",
    meetingDescription:"",
    repeat: '',
    repeatFrequency: '',
    }
    */

    this.setState({formData: formData});
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  handleFormFocus(e, component) {
    // console.log(e, component);
  }

  handleSubmit() {
    // call API here and create meeting
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
          <Separator label="Meeting start" />
          <DatePicker
            style={{width: 200}}
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

          <Separator label="Meeting end" />
          <DatePicker
            style={{width: 200}}
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
        </Form>
=======
        </Form>

        {/*
        DatePicker is not from react-native-form-generator package
        so we're not fetching it from ref. We're setting onDateChange
        function which will do setState({date: date})
        */}
        <Text>{'When will this meeting start?'}</Text>
        <DatePicker
          style={{width: 200}}
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

        <Text>{JSON.stringify(this.state.formData)}</Text>
        <Text>{JSON.stringify(this.state.startDate)}</Text>
        <Text>{JSON.stringify(this.state.endDate)}</Text>

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
export default NewMeetingForm;

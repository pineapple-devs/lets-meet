import React, { Component } from 'react'
import { connect } from 'react-redux'
import MeetingActions from '../Redux/MeetingRedux'
import GooglePlacesInput from '../Services/GooglePlacesAutoComplete'

import {
  Text,
  ScrollView,
  Button
} from 'react-native'
import { DatePicker } from 'react-native-ui-xg'
import { Actions as NavigationActions } from 'react-native-router-flux'

import {
  Form,
  InputField
} from 'react-native-form-generator'

export class EditMeetingForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formData: {},
      startDate: this.props.meetingData.start_time,
      endDate: this.props.meetingData.end_time,
      location: this.props.meetingData.location
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.setLocation = this.setLocation.bind(this)
  }

  componentWillReceiveProps (newProps) {
    NavigationActions.meetingsScreen()
  }

  handleFormChange (formData) {
    this.setState({ formData: formData })
    this.props.onFormChange && this.props.onFormChange(formData)
  }

  handleFormFocus (e, component) {
    // console.log(e, component);
  }

  handleSubmit () {
    const meetingId = this.props.meetingData.meeting_id
    const formData = this.state.formData
    const userId = this.props.userId
    const startTime = this.state.startDate
    const endTime = this.state.endDate
    const location = this.state.location

    const meetingParams = {
      meeting: {
        title: formData.meetingName,
        description: formData.meetingDescription,
        user_id: userId,
        location: location
      },
      intervals: [{ start_time: startTime, end_time: endTime }]
    }

    this.props.updateMeeting(userId, meetingId, meetingParams)
  }

  setLocation (location) {
    this.setState({ location })
  }

  render () {
    const GooglePlacesInputField = GooglePlacesInput(
      this.props.googlePlacesApiKey,
      this.setLocation,
      this.state.location
    )

    return (
      <ScrollView
        keyboardShouldPersistTaps='always'
        style={{ paddingLeft: 10, paddingRight: 10, height: 200 }}
      >
        <Form
          ref='addAddMeetingForm'
          onFocus={this.handleFormFocus.bind(this)}
          onChange={this.handleFormChange.bind(this)}
          label='New Meeting'
        >
          <InputField
            ref='meetingName'
            value={this.props.meetingData.title} />

          <InputField
            multiline
            ref='meetingDescription'
            value={this.props.meetingData.description}
          />

          {/*
          DatePicker is not from react-native-form-generator package
          so we're not fetching it from ref. We're setting onDateChange
          function which will do setState({date: date})
          */}
          <Text>{'When will this meeting start?'}</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.startDate}
            mode='datetime'
            format='YYYY-MM-DD HH:mm'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={{
              dateIcon: {
                position: 'absolute',
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
              this.setState({ startDate: chosenDate })
            }}
          />

          <Text>{'When will this meeting end?'}</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.endDate}
            mode='datetime'
            format='YYYY-MM-DD HH:mm'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={{
              dateIcon: {
                position: 'absolute',
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
              this.setState({ endDate: chosenDate })
            }}
          />

          <Text style={{ marginTop: 20 }} >
            {'Where will your meeting take place?'}
          </Text>
          {GooglePlacesInputField}
        </Form>

        <Text>{JSON.stringify(this.state.formData)}</Text>
        <Text>{JSON.stringify(this.state.startDate)}</Text>
        <Text>{JSON.stringify(this.state.endDate)}</Text>

        <Button
          icon='md-checkmark'
          iconPlacement='right'
          onPress={this.handleSubmit}
          title='Save'
        >
          "Save"
        </Button>

      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.meeting.fetching,
    userId: state.login.userId,
    googlePlacesApiKey: state.login.googlePlacesApiKey,
    meeting: state.meeting.meeting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMeeting: (userId, meetingId, meetingParams) => {
      return dispatch(MeetingActions.updateMeeting(userId, meetingId, meetingParams))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMeetingForm)

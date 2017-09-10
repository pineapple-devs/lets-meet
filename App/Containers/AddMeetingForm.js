import React, { Component } from 'react'
import { connect } from 'react-redux'
import MeetingActions from '../Redux/MeetingRedux'
import GooglePlacesInput from '../Services/GooglePlacesAutoComplete'

import {
  Text,
  ScrollView,
  ToastAndroid,
  TextInput,
  Button,
  KeyboardAvoidingView
} from 'react-native'
import CheckBox from 'react-native-check-box'
import { DatePicker } from 'react-native-ui-xg'
import { Actions as NavigationActions } from 'react-native-router-flux'

import {
  Form,
  InputField
} from 'react-native-form-generator'

export class AddMeetingForm extends Component {
  constructor (props) {
    super(props)

    const guests = [
      { name: 'Nikola', email: 'nikolaseap@gmail.com', checked: false },
      { name: 'Jana', email: 'jana_vojnovic@hotmail.com', checked: false },
      { name: 'Marina', email: 'marina_nenic@hotmail.com', checked: false }
    ]

    this.state = {
      formData: {},
      startDate: new Date(),
      endDate: new Date(),
      guests: guests,
      location: null,
      newGuest: 'invite.user@via.email',
      showModal: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.addToGuests = this.addToGuests.bind(this)
    this.setLocation = this.setLocation.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.meeting) {
      NavigationActions.meetingsScreen()
      NavigationActions.pop()
    }
  }

  handleFormChange (formData) {
    this.setState({ formData: formData })
    this.props.onFormChange && this.props.onFormChange(formData)
  }

  handleFormFocus (e, component) {
    // console.log(e, component);
  }

  handleSubmit () {
    // call API here and create meeting
    const formData = this.state.formData
    const userId = this.props.userId
    const location = this.state.location
    const startTime = this.state.startDate
    const endTime = this.state.endDate
    const invitedGuests = this.state.guests.filter(guest => guest.checked)
    const invitations = invitedGuests.map(guest => {
      return { email: guest.email }
    })

    const meetingParams = {
      meeting: {
        title: formData.meetingName,
        description: formData.meetingDescription,
        user_id: userId,
        location: location
      },
      intervals: [{ start_time: startTime, end_time: endTime }],
      invitations: invitations
    }

    this.props.createMeeting(userId, meetingParams)
  }

  toggleGuest (toggledGuest) {
    const guests = this.state.guests.map(guest => {
      if (toggledGuest.email === guest.email) {
        guest.checked = !guest.checked
      }

      return guest
    })

    this.setState({ guests })
  }

  validateEmail (email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  addToGuests (newGuest) {
    const newGuestEmail = newGuest.nativeEvent.text
    if (!this.validateEmail(newGuestEmail)) {
      ToastAndroid.showWithGravity(
        'Not a valid email',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
      return
    }

    const guests = this.state.guests
    guests.push({ name: '', email: newGuestEmail, checked: true })

    this.setState({ newGuest: 'invite.user@via.email', guests })
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
        <KeyboardAvoidingView behavior='padding'>
          <Form
            ref='addAddMeetingForm'
            onFocus={this.handleFormFocus.bind(this)}
            onChange={this.handleFormChange.bind(this)}
            label='New Meeting'
          >
            <InputField
              ref='meetingName'
              placeholder='Meeting name'
              underlineColorAndroid='#004c40'
            />
            <InputField
              multiline
              ref='meetingDescription'
              placeholder='Meeting description'
              underlineColorAndroid='#004c40'
            />

            {/*
            DatePicker is not from react-native-form-generator package
            so we're not fetching it from ref. We're setting onDateChange
            function which will do setState({date: date})
            */}
            <Text
              style={{
                backgroundColor: 'yellow',
                marginTop: 20,
                width: 100,
                flexDirection: 'row',
                alignSelf: 'flex-start'
              }}
            >
              {'From'}
            </Text>

            <DatePicker
              style={{
                width: 200,
                marginTop: 0
              }}
              date={this.state.startDate}
              mode='datetime'
              format='YYYY-MM-DD HH:mm A'
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
                },
                iconSource: {
                  uri: 'https://facebook.github.io/react/img/logo_og.png'
                }
              }}
              minuteInterval={10}
              onDateChange={chosenDate => {
                this.setState({ startDate: chosenDate })
              }}
            />

            <Text
              style={{
                backgroundColor: 'yellow',
                marginTop: 20,
                width: 100,
                flexDirection: 'row',
                alignSelf: 'flex-start'
              }}
            >
              {'To'}
            </Text>

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
          </Form>

          <Text
            style={{
              backgroundColor: 'yellow',
              marginTop: 20,
              width: 100,
              flexDirection: 'row',
              alignSelf: 'flex-start'
            }}
            underlineColorAndroid='#004c40'
          >
            {'Having guests?'}
          </Text>
          {this.state.guests.map(guest => (
            <CheckBox
              key={guest.email}
              rightText={`${guest.name} (${guest.email})`.trim()}
              onClick={() => this.toggleGuest(guest)}
              isChecked={guest.checked}
            />
          ))}

          <TextInput
            style={{
              height: 35,
              borderColor: 'gray',
              borderWidth: 1,
              marginTop: 5
            }}
            onChangeText={text => this.setState({ newGuest: text })}
            value={this.state.newGuest}
            underlineColorAndroid='transparent'
            onSubmitEditing={this.addToGuests}
            keyboardType='email-address'
          />

          <Text
            style={{
              backgroundColor: 'yellow',
              marginTop: 20
            }}
          >
            {'Where will your meeting take place?'}
          </Text>
          {GooglePlacesInputField}

          <Text>{JSON.stringify(this.state.formData)}</Text>
          <Text>{JSON.stringify(this.state.startDate)}</Text>
          <Text>{JSON.stringify(this.state.endDate)}</Text>
          <Text>{JSON.stringify(this.state.guests)}</Text>
          <Text>{JSON.stringify(this.state.location)}</Text>

          <Button
            icon='md-checkmark'
            iconPlacement='right'
            onPress={this.handleSubmit}
            title='Save'
          >
            "Save"
          </Button>
        </KeyboardAvoidingView>
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
    createMeeting: (userId, meetingParams) => {
      return dispatch(MeetingActions.createMeeting(userId, meetingParams))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMeetingForm)

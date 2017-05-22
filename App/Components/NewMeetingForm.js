import React from 'react';

import {StyleSheet, Text, View, ScrollView} from 'react-native';


import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

export class NewMeetingForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      formData:{},
      showModal: false
    }
  }

  handleFormChange(formData){
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
    meeting_name:"",
    meeting_description:"",
    repeat: '',
    meeting_date1: Date,
    wants_repeat: bool
    }
    */

    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleFormFocus(e, component){
    //console.log(e, component);
  }
  openTermsAndConditionsURL(){

  }
  render(){
    return (<ScrollView keyboardShouldPersistTaps='always' style={{paddingLeft:10,paddingRight:10, height:200}}>
      <Form
        ref='addNewMeetingForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Personal Information">
        <Separator />

        <InputField ref='meeting_name' placeholder='Meeting name'/>
        <InputField
          multiline={true}
          ref='meeting_description'
          placeholder='Description'
          helpText='Write down some special reminders for your meeting!' />
        <Separator />

        <SwitchField label='Repeat'
          ref="wants_reminder"
          helpText='Check if you want meeting to repeat.'/>
        <PickerField ref='gender'
          label='Repeat settings'
          options={{
            "": '',
            every_day: 'Every day',
            every_week: 'Every week',
            every_month: 'Every month'
          }}/>
          <DatePickerField ref='meeting_date1'
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()}
          placeholder='Date'/>
        <TimePickerField ref='meeting_time1'
      placeholder='Set time'/>

        <DatePickerField ref='meeting_date_time2'
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()} mode="datetime" placeholder='Meeting 2'/>
        </Form>
        
        <Text>{JSON.stringify(this.state.formData)}</Text>

      </ScrollView>);
    }
  }
export default NewMeetingForm

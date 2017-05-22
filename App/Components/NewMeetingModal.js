import React, { Component } from 'react'
import styles from './Styles/NewMeetingModalStyles.js'
import { View, Modal, Text, TextInput } from 'react-native'

class NewMeetingModal extends React.Component {


toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    return (
      <View style={{backgroundColor: '#FFFFF0', padding: 15}} >
        <Text>
           {'Meeting name'}
         </Text>
         <TextInput
            style={{height: 40}}
            placeholder=""
            onChangeText={(text) => this.setState({text})}
         />

        <Text>
            {'Short description:'}
        </Text>
        <TextInput
         style={{height: 40}}
         placeholder=""
         onChangeText={(text) => this.setState({text})}
         />


      </View>
    );
  }
}
export default NewMeetingModal

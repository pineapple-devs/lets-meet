import React from 'react';
import {View, Modal} from 'react-native';
import CircledButton from '../../Components/CircledButton';
import NewMeetingForm from '../../Components/NewMeetingForm';

export default class AddNewMeetingButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  render() {
    return (
      <View>
        <CircledButton onPress={this.toggleModal}>+</CircledButton>

        <Modal visible={this.state.showModal} onRequestClose={this.toggleModal}>
          <NewMeetingForm screenProps={{toggle: this.toggleModal}} />
        </Modal>
      </View>
    );
  }
}

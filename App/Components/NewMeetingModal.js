import React, { Component } from 'react'
import styles from './Styles/NewMeetingModalStyles.js'

class NewMeetingModal extends React.Component {
  state = {
    animationType: 'none',
    modalVisible: false,
    transparent: false,
    selectedSupportedOrientation: 0,
    currentOrientation: 'unknown',
  };

  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  _setAnimationType = (type) => {
    this.setState({animationType: type});
  };

  _toggleTransparent = () => {
    this.setState({transparent: !this.state.transparent});
  };

  render() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    var activeButtonStyle = {
      backgroundColor: '#ddd'
    };

    return (
      <View>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => this._setModalVisible(false)}
          supportedOrientations={supportedOrientationsPickerValues[this.state.selectedSupportedOrientation]}
          onOrientationChange={evt => this.setState({currentOrientation: evt.nativeEvent.orientation})}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text>This modal was presented {this.state.animationType === 'none' ? 'without' : 'with'} animation.</Text>
              <Text>It is currently displayed in {this.state.currentOrientation} mode.</Text>
              <Button
                onPress={this._setModalVisible.bind(this, false)}
                style={styles.modalButton}>
                Close
              </Button>
            </View>
          </View>
        </Modal>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>Animation Type</Text>
          <Button onPress={this._setAnimationType.bind(this, 'none')} style={this.state.animationType === 'none' ? activeButtonStyle : {}}>
            none
          </Button>
          <Button onPress={this._setAnimationType.bind(this, 'slide')} style={this.state.animationType === 'slide' ? activeButtonStyle : {}}>
            slide
          </Button>
          <Button onPress={this._setAnimationType.bind(this, 'fade')} style={this.state.animationType === 'fade' ? activeButtonStyle : {}}>
            fade
          </Button>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowTitle}>Transparent</Text>
          <Switch value={this.state.transparent} onValueChange={this._toggleTransparent} />
        </View>

        <View>
          <Text style={styles.rowTitle}>Supported orientations</Text>
          <Picker
            selectedValue={this.state.selectedSupportedOrientation}
            onValueChange={(_, i) => this.setState({selectedSupportedOrientation: i})}
            itemStyle={styles.pickerItem}
            >
            <Item label="Portrait" value={0} />
            <Item label="Landscape" value={1} />
            <Item label="Landscape left" value={2} />
            <Item label="Portrait and landscape right" value={3} />
            <Item label="Portrait and landscape" value={4} />
            <Item label="Default supportedOrientations" value={5} />
          </Picker>
        </View>

        <Button onPress={this._setModalVisible.bind(this, true)}>
          Present
        </Button>
      </View>
    );
  }
}

exports.examples = [
  {
    title: 'Modal Presentation',
    description: 'Modals can be presented with or without animation',
    render: () => <ModalExample />,
  },
];

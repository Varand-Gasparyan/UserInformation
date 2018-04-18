import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class Header extends Component {

    constructor(props) {
        super(props);
        this.header_text = (this.props && this.props.header_text) ? this.props.header_text : '';
    }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.header_text}>{this.header_text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  header_text: {
    borderBottomWidth: 0.4,
    width: responsiveWidth(100),
    height: responsiveHeight(4),
    fontSize: responsiveFontSize(2.5),
    color: 'rgb(123,123,123)',
    borderColor: '#C4C4C4',
    backgroundColor: 'rgb(241,241,241)',
  }
});

export default Header;

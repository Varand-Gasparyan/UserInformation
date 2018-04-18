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

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.header_text}>User Info</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  header_text: {
    textAlign: 'center',
    borderBottomWidth: 0.4,
    width: responsiveWidth(100),
    height: responsiveHeight(8),
    fontSize: responsiveFontSize(4),
    color: 'rgb(123,123,123)',
    borderColor: '#C4C4C4',
    backgroundColor: 'rgb(241,241,241)',
  }
});

export default Header;

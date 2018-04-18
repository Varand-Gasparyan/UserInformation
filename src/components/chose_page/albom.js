import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const NetworkService = require('./../../core/network/service');
const AppConstants = require('./../../core/settings/constants');

class Albom extends Component {

    constructor(props) {
        super(props);
        this.title = (this.props && this.props.title) ? this.props.title : '';
    }

    navigatePhotoPage = () => {
        this.props.updateScreen(AppConstants.screens.PHOTO_PAGE, {
            from_screen: AppConstants.screens.CHOSE_PAGE,
            albom_id: this.props.albom_id,
            user: this.props.user,
            back: false,
        });
    }


  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={() => this.navigatePhotoPage()}>
      <Text style={styles.albom}>{this.title}</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      alignSelf: 'center'
  },
  albom: {
      width: responsiveWidth(50),
      height: responsiveHeight(6),
      marginBottom: responsiveHeight(2),
      fontSize: responsiveFontSize(2),
      borderWidth: 0.2,
      textAlign: 'center'
  }
});

export default Albom;

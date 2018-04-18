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

class MyButton extends Component {

    constructor(props) {
        super(props);
        this.button_text = (this.props && this.props.button_text) ? this.props.button_text : '';
        this.button_image = (this.props && this.props.button_image) ? this.props.button_image : {uri: 'http://imavex.vo.llnwd.net/o18/clients/imavex/images/Services-iWorksite/service-icon-album.png'};
    }

    navigateNextPage = () => {
        let next_page = (this.props.on_click) ? this.props.on_click : AppConstants.screens.CHOSE_PAGE;
        this.props.updateScreen(next_page, {
            from_screen: AppConstants.screens.CHOSE_PAGE,
            user_id: this.props.user_id,
            user: this.props.user
        });
    }


  render() {
    return (
      <View style={styles.container}>
      <Image style={{height: responsiveWidth(30), width: responsiveWidth(30),}} source={this.button_image}/>
      <Text style={styles.button_text}>{this.button_text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      width: responsiveWidth(30),
  },
  button_text: {
      textAlign: 'center'
  }
});

export default MyButton;

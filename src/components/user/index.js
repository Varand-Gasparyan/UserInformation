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
import Header from './header';

const AppConstants = require('./../../core/settings/constants');

class User extends Component {

    constructor(props) {
        super(props);
        this.name = (this.props && this.props.name) ? this.props.name : 'no name';
        this.email = (this.props && this.props.email) ? this.props.email : 'no email';
        this.phone = (this.props && this.props.phone) ? this.props.phone : 'no phone number';
        this.website = (this.props && this.props.website) ? this.props.website : 'no website';
        this.user_info = (this.props && this.props.all_info) ? this.props.all_info : {};
    }

    navigateChosePage = () => {
        this.props.updateScreen(AppConstants.screens.CHOSE_PAGE, {
            from_screen: AppConstants.screens.HOME_PAGE,
            user: this.user_info,
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <TouchableOpacity onPress={() => this.navigateChosePage()}>
            <Header header_text={this.props.username}/>
            <Text style={styles.name_style}>{`name:   ${this.name}`}</Text>
            <Text style={styles.email_style}>{`email:   ${this.email}`}</Text>
            <Text style={styles.phone_style}>{`phone:   ${this.phone}`}</Text>
            <Text style={styles.website_style}>{`website:   ${this.website}`}</Text>
            </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 0.4,
    },
    name_style: {
        width: responsiveWidth(100),
        height: responsiveHeight(4),
        fontSize: responsiveFontSize(2),
    },
    email_style: {
        width: responsiveWidth(100),
        height: responsiveHeight(4),
        fontSize: responsiveFontSize(2),
    },
    phone_style: {
        width: responsiveWidth(100),
        height: responsiveHeight(4),
        fontSize: responsiveFontSize(2),
    },
    website_style: {
        width: responsiveWidth(100),
        height: responsiveHeight(4),
        fontSize: responsiveFontSize(2),
    }
});

export default User;

//sarqel comment cardy,,, heto ejery avelacnel ap[.js-i mej,,sra mekel sea index.jsy]
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    BackHandler,
    TouchableOpacity,
} from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const AppConstants = require('./../../core/settings/constants');

class CommentCard extends Component {

    constructor(props) {
        super(props);
        this.name = (this.props && this.props.name) ? this.props.name : '';
        this.email = (this.props && this.props.email) ? this.props.email : '';
        this.body = (this.props && this.props.body) ? this.props.body : '';
    }

    handleBackPress = () => {
        this.props.updateScreen(AppConstants.screens.CHOSE_PAGE, {
            from_screen: AppConstants.screens.POSTS_PAGE,
            user: this.props.user,
            page: 'posts'
        });
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.title_style}>{`name: ${this.name}`}</Text>
            <Text style={styles.email_style}>{`email: ${this.email}`}</Text>
            <Text style={styles.body_style}>{this.body}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.2,
    },
    title_style: {
        width: responsiveWidth(100),
        fontWeight: 'bold',
        color: 'black'
    },
    email_style: {
        width: responsiveWidth(100),
        fontWeight: 'bold',
        color: 'black'
    },
    body_style: {
        width: responsiveWidth(100),
    }
});

export default CommentCard;

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

class PostCard extends Component {

    constructor(props) {
        super(props);
        this.title = (this.props && this.props.title) ? this.props.title : '';
        this.body = (this.props && this.props.body) ? this.props.body : '';
    }

    navigateCommentPage = () => {
        this.props.updateScreen(AppConstants.screens.COMMENT_PAGE, {
            from_screen: AppConstants.screens.POST_PAGE,
            post_id: this.props.post_id,
            user: this.props.user
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <TouchableOpacity onPress={() => this.navigateCommentPage()}>
            <Text style={styles.title_style}>{this.title}</Text>
            <Text style={styles.body_style}>{this.body}</Text>
            </TouchableOpacity>
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
    body_style: {
        width: responsiveWidth(100),
    }
});

export default PostCard;

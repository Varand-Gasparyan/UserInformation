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

class TodoCard extends Component {

    constructor(props) {
        super(props);
        this.title = (this.props && this.props.title) ? this.props.title : '';
        this.completed = (this.props && this.props.completed == true) ? {uri: AppConstants.check_icon} : {uri: AppConstants.uncheck_icon};
    }

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.text_style}>{this.title}</Text>
            <Image style={styles.icon_style} source={this.completed}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: responsiveWidth(1),
        borderBottomWidth: 0.2,
    },
    text_style: {
        width: responsiveWidth(70),
    },
    icon_style: {
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        marginLeft: responsiveWidth(10)
    },
});

export default TodoCard;

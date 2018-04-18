import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';

const NetworkService = require('./../../core/network/service');
const AppConstants = require('./../../core/settings/constants');

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import User from './../user/index';
import Header from './header';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    async componentWillMount() {
        let url = AppConstants.API_BASE_URL + AppConstants.api_urls.GET_USER;
        await NetworkService.makeAPIGetRequest(url).then(user_data => {
            this.setState({
                users: user_data
            })
        }).catch(err => {
            console.log('err == ', err);
        })
    }

    renderUsers() {
        let users = this.state.users;
        let result = [];
        users.map((user, index) => {
            let item = <User updateScreen={this.props.updateScreen} key={index}
                        name={user.name} username={user.username} phone={user.phone}
                        website={user.website} all_info={user}/>
            result.push(item);
        })
        return result;
    }

    render() {
        let users = this.renderUsers();
        return (
            <View>
            <Header/>
            <View style={styles.users}>
            <ScrollView style={styles.scroll_view}>
            {users}
            </ScrollView>
            </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    users: {
        marginTop: responsiveHeight(2),
        marginLeft: responsiveHeight(2),
        marginRight: responsiveHeight(2),
    },
    scroll_view: {
        marginBottom: responsiveHeight(18),
    }
});

export default HomePage;

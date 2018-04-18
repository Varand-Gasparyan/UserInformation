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

import CommentCard from './comment_card';

class CommentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    async componentWillMount() {
        let url = AppConstants.API_BASE_URL + AppConstants.api_urls.GET_COMMENTS;
        await NetworkService.makeAPIGetRequest(url).then(comments_data => {
            this.setState({
                comments: comments_data
            })
        }).catch(err => {
            console.log('err == ', err);
        })
    }

    renderComments() {
        let result = [];
        this.state.comments.map((item, index) => {
            if (item.postId == this.props.params.post_id) {
                let comment_item = <CommentCard key={index} updateScreen={this.props.updateScreen} user={this.props.params.user} updateScreen={this.props.updateScreen} name={item.name} email={item.email} body={item.body}/>
                result.push(comment_item);
            }
        })
        return result;
    }
    render() {
        let comments = this.renderComments();
        return (
            <View>
            <ScrollView style={styles.scroll_view}>
            {comments}
            </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({

});

export default CommentPage;

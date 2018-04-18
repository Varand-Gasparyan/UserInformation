import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    BackHandler,
    TouchableOpacity
} from 'react-native';

const AppConstants = require('./../../core/settings/constants');
const NetworkService = require('./../../core/network/service');

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Header from './header';
import MyButton from './my_button';
import Albom from './albom';
import PostCard from './post_card';
import TodoCard from './todo_card';

class ChosePage extends Component {

    constructor(props) {
        super(props);

        this.user_id = (this.props.params.user && this.props.params.user.id) ? (this.props.params.user.id) : null;
        this.name = (this.props.params.user && this.props.params.user.name) ? this.props.params.user.name : 'no name';
        this.username = (this.props.params.user && this.props.params.user.username) ? this.props.params.user.username : 'no username';
        this.email = (this.props.params.user && this.props.params.user.email) ? this.props.params.user.email : 'no email';
        this.phone = (this.props.params.user && this.props.params.user.phone) ? this.props.params.user.phone : 'no phone number';
        this.website = (this.props.params.user && this.props.params.user.website) ? this.props.params.user.website : 'no website';
        this.address = (this.props.params.user && this.props.params.user.address) ? ('city '+ this.props.params.user.address.city +
                                                                                    ', st. ' + this.props.params.user.address.street) : 'no address';
        this.user = this.props.params.user || {};

        this.back = true;
        this.page = this.props.params.page || 'main';
        this.state = {
            page: this.page,
            alboms: [],
            todos: [],
            posts: [],
        }
    }

    handleBackPress = () => {
        if (this.back == false) {
            this.setState({
                page: 'main'
            })
            this.back = true;
            return true;
        }
        this.props.updateScreen(AppConstants.screens.HOME_PAGE, {
            from_screen: AppConstants.screens.CHOSE_PAGE
        });
        return true;
    }

    async componentWillMount() {
        var url = AppConstants.API_BASE_URL + AppConstants.api_urls.GET_ALBOMS;
        await NetworkService.makeAPIGetRequest(url).then(alboms => {
            this.setState({
                alboms: alboms
            })
        }).catch(err => {
            console.log('err == ', err);
        })

        var url = AppConstants.API_BASE_URL + AppConstants.api_urls.GET_TODOS;
        await NetworkService.makeAPIGetRequest(url).then(todos => {
            this.setState({
                todos: todos
            })
        }).catch(err => {
            console.log('err == ', err);
        })
        var url = AppConstants.API_BASE_URL + AppConstants.api_urls.GET_POSTS;
        await NetworkService.makeAPIGetRequest(url).then(posts => {
            this.setState({
                posts: posts
            })
        }).catch(err => {
            console.log('err == ', err);
        })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }



    openAlbums() {
        this.setState({
            page: 'alboms'
        })
    }

    openPosts() {
        this.setState({
            page: 'posts'
        })
    }

    openTodo() {
        this.setState({
            page: 'todo'
        })
    }

    renderCurrentView = () => {
        if (this.state.page == 'main') {
            return (
                <View>
                <View style={styles.button_first_line}>
                <TouchableOpacity onPress={() => this.openAlbums()}>
                <MyButton button_text={'Alboms'} button_image={{uri: 'http://imavex.vo.llnwd.net/o18/clients/imavex/images/Services-iWorksite/service-icon-album.png'}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.openPosts()}>
                <MyButton on_click={AppConstants.screens.POST_PAGE} updateScreen={this.props.updateScreen} user_id={this.user_id} user={this.user} button_text={'Posts'} updateScreen={this.props.updateScreen} button_image={{uri: 'https://cdlhunter.com/wp-content/uploads/2018/02/briefcase-512.png'}}/>
                </TouchableOpacity>
                </View>
                <View style={styles.button_second_line}>
                <TouchableOpacity onPress={() => this.openTodo()}>
                <MyButton on_click={AppConstants.screens.TODO_PAGE} updateScreen={this.props.updateScreen} user_id={this.user_id} user={this.user} button_text={'ToDo'} updateScreen={this.props.updateScreen} button_image={{uri: 'https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_960_720.png'}}/>
                </TouchableOpacity>
                </View>
                </View>
            );
        }
        else if (this.state.page == 'alboms') {
            this.back = false;
            let result = [];
            this.state.alboms.map((item, index) => {
                if (item.userId == this.user_id) {
                    let albom_item = <Albom updateScreen={this.props.updateScreen} user={this.props.params.user} albom_id={item.id} key={index} title={item.title}/>
                    result.push(albom_item);
                }
            })
            return (
                <View style={{alignItems: 'center'}}>
                <ScrollView style={{width: responsiveWidth(100), height: responsiveHeight(60), marginTop: responsiveHeight(2)}}>
                {result}
                </ScrollView>
                </View>
            );
        }
        else if (this.state.page == 'posts') {
            this.back = false;
            let result = [];
            this.state.posts.map((item, index) => {
                if (item.userId == this.user_id) {
                    let post_card = <PostCard updateScreen={this.props.updateScreen} user={this.props.params.user} post_id={item.id} key={index} title={item.title} body={item.body}/>
                    result.push(post_card);
                }
            })
            return (
                <View style={{alignItems: 'center', marginLeft: responsiveWidth(3), marginRight: responsiveWidth(3)}}>
                <ScrollView style={{height: responsiveHeight(60), marginTop: responsiveHeight(2)}}>
                {result}
                </ScrollView>
                </View>
            );
        }
        else if (this.state.page == 'todo') {
            this.back = false;
            let result = [];
            this.state.todos.map((item, index) => {
                if (item.userId == this.user_id) {
                    let todo_item = <TodoCard key={index} user={this.props.params.user} title={item.title} completed={item.completed}/>
                    result.push(todo_item);
                }
            })
            return (
                <View style={{alignItems: 'center', marginLeft: responsiveWidth(3), marginRight: responsiveWidth(3)}}>
                <ScrollView style={{height: responsiveHeight(60), marginTop: responsiveHeight(2)}}>
                {result}
                </ScrollView>
                </View>
            );
        }
        else {
            return (
                    <View/>
            );
        }
    }

    render() {

        return (
            <View>
            <Header/>
            <View style={{marginLeft: responsiveWidth(3)}}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>User information</Text>
            <View style={{marginLeft: responsiveWidth(2), marginTop: responsiveHeight(2)}}>
            <Text style={styles.name_style}>{`name:   ${this.name}`}</Text>
            <Text style={styles.username_style}>{`username:   ${this.username}`}</Text>
            <Text style={styles.email_style}>{`email:   ${this.email}`}</Text>
            <Text style={styles.phone_style}>{`phone:   ${this.phone}`}</Text>
            <Text style={styles.website_style}>{`website:   ${this.website}`}</Text>
            <Text style={styles.address_style}>{`address:   ${this.address}`}</Text>
            </View>
            </View>
            {this.renderCurrentView()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    name_style: {
        width: responsiveWidth(100),
        fontSize: responsiveFontSize(2),
    },
    email_style: {
        width: responsiveWidth(100),
        fontSize: responsiveFontSize(2),
    },
    phone_style: {
        width: responsiveWidth(100),
        fontSize: responsiveFontSize(2),
    },
    website_style: {
        width: responsiveWidth(100),
        fontSize: responsiveFontSize(2),
    },
    username_style: {
        width: responsiveWidth(100),
        fontSize: responsiveFontSize(2),
    },
    address_style: {
        width: responsiveWidth(80),
        fontSize: responsiveFontSize(2),
    },
    button_first_line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(6),
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5)
    },
    button_second_line: {
        alignSelf: 'center',
        marginTop: responsiveHeight(3),
    }
});

export default ChosePage;

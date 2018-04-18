/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import HomePage from './src/components/home_page/index';
import ChosePage from './src/components/chose_page/index';
import PhotoPage from './src/components/photo_page/index';
import CommentPage from './src/components/comment_page/index';

const AppConstants = require('./src/core/settings/constants');

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            screens: [AppConstants.screens.HOME_PAGE],
            params: {}
        };

        this.renderers = {};
        this.renderers[AppConstants.screens.HOME_PAGE] = this.renderHomePage;
        this.renderers[AppConstants.screens.CHOSE_PAGE] = this.renderChosePage;
        this.renderers[AppConstants.screens.PHOTO_PAGE] = this.renderPhotoPage;
        this.renderers[AppConstants.screens.COMMENT_PAGE] = this.renderCommentPage;
    }

    updateScreen = (screen, params) => {
        let screens = this.state.screens;
        if (screen == AppConstants.screens.BACK_PRESSED) {
            screens.pop();
        } else {
            if (screen == AppConstants.screens.HOME_PAGE) {
                screens = [];
            }

            let cycle_position = screens.indexOf(screen);
            if (cycle_position != -1) {
                screens.splice(cycle_position, 1);
            }

            if (!screens || !screens.length) {
                screens = [screen];
            }
            if (screens[screens.length - 1] != screen) {
                screens.push(screen);
            }
        }

        this.setState({
            screens: screens,
            params: params
        });
    }

    render() {
        let screens = this.state.screens;
        let current_screen = AppConstants.screens.HOME_PAGE;
        if (screens && screens.length) {
            current_screen = screens[screens.length - 1];
        }

        return this.renderers[current_screen]();
    }

    renderChosePage = () => {
        return (
            <ChosePage updateScreen={this.updateScreen} params={this.state.params}/>
        );
    }

    renderHomePage = () => {
        return (
            <HomePage updateScreen={this.updateScreen} params={this.state.params}/>
        );
    }

    renderPhotoPage = () => {
        return (
            <PhotoPage updateScreen={this.updateScreen} params={this.state.params}/>
        );
    }
    renderCommentPage = () => {
        return (
            <CommentPage updateScreen={this.updateScreen} params={this.state.params}/>
        )
    }
}

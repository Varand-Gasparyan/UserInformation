import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    BackHandler,
    Image,
    TouchableOpacity
} from 'react-native';

const NetworkService = require('./../../core/network/service');
const AppConstants = require('./../../core/settings/constants');

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ImagePreview from 'react-native-image-preview';

class PhotoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            visible: false,
            full_image: {uri: 'https://www.transparenttextures.com/patterns/asfalt-light.png'},
        }
    }

    handleBackPress = () => {
        this.props.updateScreen(AppConstants.screens.CHOSE_PAGE, {
            from_screen: AppConstants.screens.PHOTO_PAGE,
            user: this.props.params.user,
            user_id: this.props.params.user.id,
            page: 'alboms'
        });
        return true;
    }

    async componentWillMount() {
        let url = AppConstants.API_BASE_URL + AppConstants.api_urls.GET_PHOTOS;
        this.user_alboms = [];
        await NetworkService.makeAPIGetRequest(url).then(photos => {
            this.setState({
                photos: photos
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

    openImage(url) {
        let full_image = {uri: url};
        this.setState({
            full_image: full_image,
            visible: true,
        })
    }

    setVisibleToFalse() {
        this.setState({
            visible: false
        })
    }

    renderPhotos() {
        var column_count = 3;
        var current_column = -1;
        var component_row = [];
        var final_result = [];
        var photos = [];
        this.state.photos.map((item, index) => {
            if (item.albumId == this.props.params.albom_id)
                photos.push(item);
        });

        photos.map((item, index) => {
            ++current_column;
            if (current_column == column_count) {
                let row = <View key={index} style={styles.gridViewRowStyle}>{component_row}</View>
                final_result.push(row);
                component_row = [];
                current_column = 0;
            }

            let url = {uri: item.url};
            let comp =  <Image style={styles.gridViewItemStyle} source={url}/>
            let touch_comp = <TouchableOpacity key={index} onPress={() => this.openImage(item.thumbnailUrl)}>{comp}</TouchableOpacity>
            component_row.push(touch_comp);
        })
        let row = <View key={1} style={styles.gridViewRowStyle}>{component_row}</View>
        final_result.push(row);
        return final_result;
    }

    render() {
        let photos = this.renderPhotos();
        return (
            <View>
            <ImagePreview visible={this.state.visible} source={this.state.full_image} close={() => this.setVisibleToFalse()} />
            <ScrollView>
            {photos}
            </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    gridViewRowStyle: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    gridViewItemStyle: {
        width: responsiveWidth(30),
        height: responsiveWidth(30),
        margin: responsiveWidth(1)
    },
});

export default PhotoPage;

import {
    NetInfo,
    Platform
} from 'react-native';


const NetworkErrors = {
    NO_NETWORK: 'no_network',
    INVALID_REQUEST_PARAMS: 'invalid_request_parameters',
    INVALID_RESPONSE_DATA: 'invalid_response_data',
    RESPONSE_PARSING_ERROR: 'response_parsing_error',
    AUTH_ERROR: 'auth_error'
}

class NetworkService {

    makeAPIRequest = (url, options) => {
        return new Promise((resolve, reject) => {
            options = options || {};
            if (!url) {
                return reject(NetworkErrors.INVALID_REQUEST_PARAMS)
            }
            if (!options.method) {
                options.method = 'get';
            }
            let fetch_options = {
                method: options.method,
                headers: options.headers || {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
            try {
                if (options.body) {
                    fetch_options.body = JSON.stringify(options.body);
                }
            } catch (ex) {
                console.log(ex);
                return reject(NetworkErrors.INVALID_REQUEST_PARAMS);
            }
            console.log('body == ', fetch_options.body);
            fetch(url, fetch_options)
                .then((response) => {
                    console.log('----- fetch response ==  ', response, '------');
                    return response.json();
                }).then((responseJson) => {
                    if (responseJson.error) {
                        return reject(response.more_info);
                    }
                    return resolve(responseJson);
                }).catch(err => {
                    console.log('err == ', err);
                    return reject(err);
            })
        })
    }



    makeAPIGetRequest = (url, options) => {
        options = options || {};
        options.method = 'get';
        return this.makeAPIRequest(url, options);
    }

    makeAPIPostRequest = (url, options) => {
        options = options || {};
        options.method = 'post';
        return this.makeAPIRequest(url, options);
    }

    makeAPIPutRequest = (url, options) => {
        options = options || {};
        options.method = 'put';
        return this.makeAPIRequest(url, options);
    }

    makeAPIDeleteRequest = (url, options) => {
        options = options || {};
        options.method = 'delete';
        return this.makeAPIRequest(url, options);
    }
}

module.exports = new NetworkService();
module.exports.Errors = NetworkErrors;

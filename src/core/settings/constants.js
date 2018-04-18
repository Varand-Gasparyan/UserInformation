const AppConstants = {
    network_request_methods: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    },
    API_BASE_URL: 'https://jsonplaceholder.typicode.com/',
    api_urls: {
        GET_USER: 'users/',
        GET_ALBOMS: 'albums/',
        GET_PHOTOS: 'photos/',
        GET_TODOS: 'todos/',
        GET_POSTS: 'posts/',
        GET_COMMENTS: 'comments/',
    },
    screens: {
        HOME_PAGE: 'home_page',
        CHOSE_PAGE: 'chose_page',
        ALBOMS_PAGE: 'alboms_page',
        PHOTO_PAGE: 'photo_page',
        TODO_PAGE: 'todo_page',
        POST_PAGE: 'post_page',
        COMMENT_PAGE: 'comment_page'
    },
    check_icon: 'http://cdn.onlinewebfonts.com/svg/img_143278.png',
    uncheck_icon: 'http://cdn.onlinewebfonts.com/svg/img_182491.png',
}

module.exports = AppConstants;

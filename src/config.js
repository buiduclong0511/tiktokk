

const config = {
    routes: {
        base: process.env.REACT_APP_PUBLIC_URL,
        home: '/',
        following: '/following',
        postDetail: '/:nickname/video/:videoId',
        profile: '/@:nickname',
        allSearchResults: '/search',
        upload: '/upload',
        message: '/message'
    }
}

export default config
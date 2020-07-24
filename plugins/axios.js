
export default function ({ $axios, redirect, env }, inject) {

    $axios.onRequest(config => {
        // console.log('Making request to ' + config.url)
        config.crossdomain = true
        return config
    })
    
    $axios.setBaseURL(env.API_BASE)

    // Inject to context as $api
    // inject('api', api)

    // $axios.onError(error => {
    //     const code = parseInt(error.response && error.response.status)
    //     if (code === 400) {
    //     redirect('/400')
    //     }
    // })
}


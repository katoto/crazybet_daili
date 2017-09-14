/**
 * Created by lichun on 2017/5/10.
 */
import axios from 'axios'

const options = {};
if (process.env.NODE_ENV === 'production') {
    if(window.location.protocol==='http:'){
        options.baseURL = 'http://crazybet.choopaoo.com:7899'
    }else{
        options.baseURL = 'https://crazybet.choopaoo.com:47899'
    }
} else if (process.env.NODE_ENV === 'preRelease') {
    // options.baseURL = 'http://crazybet.choopaoo.com:9899'
    options.baseURL = 'http://192.168.41.76:9899'
} else {
    options.baseURL = '/api'
}
const _axios = axios.create(options);

const ajax = function (url, config) {
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            const error = new Error(response.message)
            error.code = response.status
            throw error
        }
    }).then(resp => {
        if (resp.status === '100') {
            return resp.data
        } else {
            const error = new Error(resp.message)
            error.code = resp.status
            throw error
        }
    })
}
ajax.get = function (url, config) {
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            const error = new Error(response.message)
            error.code = response.status
            throw error
        }
    }).then(resp => {
        if (resp.status === '100') {
            return resp.data
        } else {
            const error = new Error(resp.message)
            error.code = resp.status
            throw error
        }
    })
}
ajax.post = function (url, param, config) {
    // config = {
    //     headers:{
    //         'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    //     }
    // }
    console.log(config)
    return _axios.post(url, param, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            const error = new Error(response.message)
            error.code = response.status
            throw error
        }
    }).then(resp => {
        if (resp.status === '100') {
            return resp.data
        } else {
            const error = new Error(resp.message)
            error.code = resp.status
            throw error
        }
    })
}
export default ajax

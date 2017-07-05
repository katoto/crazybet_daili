/**
 * Created by lichun on 2017/1/19.
 */
const express = require('express')
const path = require('path')

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const forward = require('forward-request')
const webpackConfig = require('./crazybet_daili/build/webpack.dev.config')

const app = express()
if (process.env.NODE_ENV === 'production') {
    const compression = require('compression')
    app.use(compression())
    app.use(express.static(path.join(__dirname, 'dist'), {
        maxAge: '1d'
    }))
} else {
    const compiler = webpack(webpackConfig)
    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        publicPath: webpackConfig.output.publicPath
    }))
    app.use(webpackHotMiddleware(compiler, {
        log: () => {}
    }))
}

app.use(function (req, resp, next) {

    if (~req.originalUrl.indexOf('/api')) {
        forward({
            req,
            resp,
            // host: 'crazybet.choopaoo.com',
            // ip: '106.75.139.22',
            host: 'crazybet.choopaoo.com',
            ip: '192.168.41.76',
            // host: 'crazybet.choopaoo.com',
            // ip: '106.75.138.85',
            path: req.originalUrl.replace('/api', ''),
            port: '8090',
            showLog: true
        })
        // 9899
    } else {
        forward({
            req,
            resp,
            host: 'crazybet.choopaoo.com',
            ip: '106.75.139.22',
            port: '80',
            showLog: true
        })
    }
    // 二维码是7899  下单接口是6899
})

if (process.env.LOCAL_ENV) {
    const app2 = express()
    app2.use((req, resp) => {
        forward({
            req,
            resp,
            host: 'crazybet.choopaoo.com',
            ip: '106.75.139.22',
            port: '6899',
            showLog: true
        })
    })
    app2.listen(8090)
}
console.log(`Listening on port !`)
let port = process.env.PORT || 8080
app.listen(port, function () {
    console.log(`Listening on port ${port}!`)
})

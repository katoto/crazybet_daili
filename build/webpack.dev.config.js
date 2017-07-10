/**
 * Created by lichun on 2017/1/18.
 */

const webpack = require('webpack')
const base = require('./webpack.base.config')
let entry = {vendor: base.entry.vendor}
Object.keys(base.entry).filter(key => key !== 'vendor').forEach(key => {
    entry[key] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(base.entry[key])
})

module.exports = Object.assign({}, base, {
    devtool: '#cheap-module-eval-source-map',
    entry,
    plugins: base.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            filename: `[name].js`
        })

    ]),
    module: {
        rules: [
            ...base.module.rules,
            {
                test: /\.vue$/,
                // exclude: /node_modules/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader'

                ]

            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    name: `[path][name].[ext]?[hash:8]`
                }

            }
        ]
    }

})
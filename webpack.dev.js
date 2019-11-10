const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
require('dotenv').config({path: '.env', encoding: 'utf8'})

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    output: {
        libraryTarget: 'var',
        library: 'Client',
        publicPath: '/'
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                // Sass addition
                test: /\.scss$/,
                // Chained loaders RUNS FROM RIGHT TO LEFT!!! - Webpack will utilize the loaders in the specified order
                use: ['style-loader', 'css-loader', 'sass-loader']               
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new webpack.DefinePlugin({
            AYLIEN_ID: JSON.stringify(process.env.AYLIEN_ID),
            AYLIEN_KEY: JSON.stringify(process.env.AYLIEN_KEY),
            DEV_MODE: true,
            HOME_PORT: process.env.PORT
        })
    ]
}
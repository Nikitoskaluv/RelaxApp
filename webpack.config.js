const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: resolve(__dirname, 'js', 'main.js'),
    output: {
        filename: 'main.[contenthash].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({ template: resolve(__dirname, './pages/index.html') })
    ]
}
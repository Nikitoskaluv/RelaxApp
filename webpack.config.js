const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isDev = process.env.NODE_ENV === 'development';


module.exports = {
    mode: 'development',
    entry: {
        main: './js/main.js',
    },

    output: {
        filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './pages/index.html',
            inject: true,
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new HTMLWebpackPlugin({
            filename: 'login.html',
            template: './pages/login.html',
        }),
        new HTMLWebpackPlugin({
            filename: 'meditation.html',
            template: './pages/meditation.html',
        }),
        new HTMLWebpackPlugin({
            filename: 'registration.html',
            template: './pages/registration.html',
        }),
        new HTMLWebpackPlugin({
            filename: 'user_profile.html',
            template: './pages/user_profile.html',
        }),
        new HTMLWebpackPlugin({
            filename: 'warm_up.html',
            template: './pages/warm_up.html',
        }),
        new HTMLWebpackPlugin({
            filename: 'eyes.html',
            template: './pages/eyes.html',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin(
            {
                patterns: [
                    {
                        from: path.resolve(__dirname, 'assets/img'),
                        to: path.resolve(__dirname, 'dist/assets/img')
                    },
                    {
                        from: path.resolve(__dirname, 'assets/icons'),
                        to: path.resolve(__dirname, 'dist/assets/icons')
                    },
                    {
                        from: path.resolve(__dirname, 'assets/sounds'),
                        to: path.resolve(__dirname, 'dist/assets/sounds')
                    },
                    {
                        from: path.resolve(__dirname, 'assets/videos'),
                        to: path.resolve(__dirname, 'dist/assets/videos')
                    },

                ]
            }
        ),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })

    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,

                }, 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            }, {
                test: /\.s[ac]ss$/i,
                use: [
                    (isDev) ? { loader: 'style-loader' } : {
                        loader: MiniCssExtractPlugin.loader,

                    }, 'css-loader', 'sass-loader']
            },
        ]
    }
}


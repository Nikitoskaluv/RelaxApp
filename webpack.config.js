const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isDev = process.env.NODE_ENV === 'development';

const pages = [
    {
        "name": "login",
        "js": ["login", "validation", "main"],
        "html": "login"
    },
    {
        "name": "registration",
        "js": ["registration", "validation", "main"],
        "html": "registration"
    },
    {
        "name": "index",
        "js": ["advice", "player", "timer", "main", "logoutWarning", "menu"],
        "html": "index"
    },
    {
        "name": "user_profile",
        "js": ["main", "user_profile", "logoutWarning", "menu"],
        "html": "user_profile"
    },
    {
        "name": "warm_up",
        "js": ["main", "logoutWarning", "menu"],
        "html": "warm_up"
    },
    {
        "name": "eyes",
        "js": ["main", "logoutWarning", "slider", "menu"],
        "html": "eyes"
    },
    {
        "name": "meditation",
        "js": ["main", "logoutWarning", "player", "menu"],
        "html": "meditation"
    }];
// const pagesWithoutJs = [

// ];

module.exports = {
    mode: 'development',
    entry: pages.reduce((config, page) => {
        config[page.name] = page.js.map(p => `./js/${p}.js`);
        return config;
    }, {}),

    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
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
        new CleanWebpackPlugin(),
    ].concat(pages.map(
        (page) =>
            new HtmlWebpackPlugin({
                inject: true,
                template: `./pages/${page.html}.html`,
                filename: `${page.html}.html`,
                chunks: [page.name],
                minify: {
                    collapseWhitespace: !isDev
                }
            }))),
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


const path = require('path');
const loader = require('sass-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractWebpackPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");



module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, './src/js/index.js')
    },
    output: {
        filename: '[name].js',
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[name][ext]'
    }, 
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            },
            port: 3000,
            open: true,
            hot: true,
            compress: true, 
            historyApiFallback: true,
            watchFiles: {
            paths: ['./src/pug/index.html'], 
                options: {
                usePolling: true,
                },
            }
        },
    module: {
        rules : [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractWebpackPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader'
                ]
            },
            { 
                test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i, 
                type: 'asset/resource', 
            },
            {
                test: /\.pug$/,
                include: path.join(__dirname, 'src/pug'),
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template : './src/pug/index.html',
            filename: 'index.html',
            inject   : true,
            minify: false
        }),
        new MiniCssExtractWebpackPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPugPlugin({
            adjustIndent: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./src/assets",
                    to: "./assets"
                }
            ]
        }),
    ]
};

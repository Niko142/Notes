const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExctractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: "./src/Comments.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist"),
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    devServer: {
        static: './dist',
        port: 8000,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Notes',
            template: './src/Comments.html',
            filename: 'index.html',
            inject: 'body',
        }),
        new MiniCssExctractPlugin({
            filename: '[name].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExctractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                }
            }
        ]
    }
};
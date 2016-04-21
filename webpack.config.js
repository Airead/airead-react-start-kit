const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

var publicPath = 'http://localhost:8088/';
// var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
var hotMiddlewareScript = 'webpack-hot-middleware/client';

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'public')
};

const common = {
    entry: {
        app: PATHS.app
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js',
        publicPath: publicPath,
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel?cacheDirectory'],
            include: PATHS.app
        }, {
            test: /\.css$/,
            loaders: [
                'style?sourceMap',
                'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
            ]
        }]
    }
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        entry: {
            app: [PATHS.app, 'webpack-hot-middleware/client?reload=true']
        },
        devtool: 'source-map',
        devServer: {
            contentBase: './public',
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            stats: 'errors-only',
            host: process.env.HOST || '0.0.0.0',
            port: process.env.PORT
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}

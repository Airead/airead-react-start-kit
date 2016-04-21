var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.HRM === '1') {
    console.log("hrm loadeding");

    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpackDevConfig = require('../webpack.config.js');
    var compiler = webpack(webpackDevConfig);

    console.log(webpackDevConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));
}
app.use(express.static(path.join(__dirname, '../public')));

app.get('/test', function(req, res) {
    res.send('Hello world');
});

app.listen(8088, function() {
    console.log('listen http://127.0.0.1:8088');
});

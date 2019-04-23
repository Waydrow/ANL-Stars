/**
 * This is the app file of `SKA 2018 Website`.
 *
 * @name      app.js
 * @summary   App file of this project
 * @link      app.js
 * @since     2018-08-10
 * @author    Zuowu Zheng <wozhengzw@gmail.com>
 */

// 3rd party modules
var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var sitemap = require('sitemap');
const mongoose = require('mongoose');


const models = path.join(__dirname, 'models');

// Bootstrap models
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(path.join(models, file)));

const User = mongoose.model('User');
const Student = mongoose.model('Student');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

// Static route
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

// Dynamic route
app.use('/', require('./routes/index'));
app.use('/year', require('./routes/year'));

// handle 404
app.use(function (req, res, next) {
    res.status(404).render("error", {status: 404});
});

//  handle error
app.use(function (err, req, res, next) {
    console.error(err);
    if (err.status) {
        res.status(err.status).render("error", {status: err.status});
    } else {
        res.status(404).render("error", {status: 404});
    }
});

mongoose.connect('mongodb://localhost/anlstars', function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log('database connected!');
        /*var stu = new Student({
            name: 'zuowu',
            email: 'test@test.com'
        });
        stu.save(function (e, us) {
            if (e) {
                return console.error(e);
            }
            console.log('new user added!')
        });*/
    }
});


module.exports = app;

app.listen(12479, function() {
    console.log("Website listening on port 12479.");
});

/**
 * This file is the route control of homepage.
 *
 * @name      index.js
 * @summary   Route control of homepage
 * @link      /route/index.js
 * @since     2018-08-10
 * @author    Zuowu Zheng <wozhengzw@gmail.com>
 */
    
// 3rd party modules
var express = require("express");
var router = express.Router();
var fs = require('fs');
var path = require('path');

const mongoose = require('mongoose');
// const User = mongoose.model('User');
const Student = mongoose.model('Student');

var root = path.join(__dirname, '../');

router.get("/", function (req, res, next) {
    Student.find({year: 2019}, function(err, students) {
        if (err) {
            req.flash('error', '未知的错误,请重试 (Unknow error... pls. try again)');
            res.redirect('back');
        } else {
            res.render("index", {
                students: students,
                year: 2019
            });
        }
    })
});

router.get("/:year/year", function (req, res, next) {
    var year = req.params.year;
    Student.find({year: year}, function(err, students) {
        if (err) {
            req.flash('error', '未知的错误,请重试 (Unknow error... pls. try again)');
            res.redirect('back');
        } else {
            var num = 0;
            if (students) {
                num = students.length;
            }
            res.render("index", {
                students: students,
                year: year,
                num: num,
            });
        }
    })
});


module.exports = router;

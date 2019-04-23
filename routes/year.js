// 3rd party modules
var express = require("express");
var router = express.Router();
var fs = require('fs');
var path = require('path');

const mongoose = require('mongoose');
// const User = mongoose.model('User');
const Student = mongoose.model('Student');

var root = path.join(__dirname, '../');


router.get("/:year", function (req, res, next) {
    var year = req.params.year;
    Student.find({year: year}, function(err, students) {
        if (err) {
            req.flash('error', '未知的错误,请重试 (Unknow error... pls. try again)');
            res.redirect('back');
        } else {
            res.render("index", {
                students: students,
                year: year
            });
        }
    })
});

module.exports = router;

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

function studentsByYear(students) {
    var res = {};
    for (var i = 0; i < students.length; i++) {
        var year = students[i].year;
        if (!res[year]) {
            res[year] = []
        }
        res[year].push(students[i]);
    }
    return res;
}

function studentsByAdvisor(students) {
    var res = {};
    for (var i = 0; i < students.length; i++) {
        var advisor = students[i].advisor;
        if (!res[advisor]) {
            res[advisor] = []
        }
        res[advisor].push(students[i]);
    }
    return res;
}


router.get("/login", function (req, res) {
    res.render('login');
});

router.post("/login", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username)
    if (username == 'admin' && password == 'anl2019') {
        req.session.admin = {
            username: username,
            password: password
        };
        return res.redirect('http://anl.sjtu.edu.cn/stars/admin/admin');
    } else {
        req.flash('error', '帐号或密码错误');
        res.redirect('back');
    }
});

router.get("/", function (req, res, next) {
    Student.find({year: 2019}, function(err, students) {
        if (err) {
            req.flash('error', '未知的错误,请重试 (Unknow error... pls. try again)');
            res.redirect('back');
        } else {
            res.render("index", {
                students: students,
                year: 2019,
                num: students.length
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

router.get("/:stuid/info", function (req, res, next) {
    Student.findOne({_id: req.params.stuid}, function (err, student) {
        if (err || !student) {
            req.flash('error', '未知的错误,请重试 (Unknow error... pls. try again)');
            res.redirect('back');
        } else {
            res.render("info", {
                student: student
            })
        }
    })
});


router.get("/:category/category", function (req, res, next) {
    var category = req.params.category;
    // -1降序 1升序
    //Student.find({position: category}).sort({year: 1}).exec(function(err, students) {
    Student.find({position: category}, function (err, students) {
        if (err) {
            req.flash('error', '未知的错误,请重试 (Unknow error... pls. try again)');
            res.redirect('back');
        } else {
            var num = 0;
            var result = {};
            if (students) {
                num = students.length;
                result = studentsByYear(students);
            }
            res.render("list", {
                result: result,
                category: category,
                num: num
            });
            //console.log(res)
        }
    })
});

router.get("/:advisor/advisor", function (req, res, next) {
    var advisor = req.params.advisor;
    if (advisor == 1) {
        advisor = '吴帆';
    } else if (advisor == 2) {
        advisor = '高晓沨';
    } else if (advisor == 3) {
        advisor = '孔令和';
    } else if (advisor == 4) {
        advisor = '傅洛伊';
    } else {
        req.flash('error', '未知的错误,请重试 (Unknow error... pls. try again)');
        res.redirect('back');
    }
    // -1降序 1升序
    //Student.find({position: category}).sort({year: 1}).exec(function(err, students) {
    Student.find({advisor: advisor}, function (err, students) {
        if (err) {
            req.flash('error', '未知的错误,请重试 (Unknow error... pls. try again)');
            res.redirect('back');
        } else {
            var num = 0;
            var result = {};
            if (students) {
                num = students.length;
                result = studentsByYear(students);
            }
            res.render("list", {
                result: result,
                num: num
            });
            //console.log(res)
        }
    })
});


module.exports = router;

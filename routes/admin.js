// 3rd party modules
var express = require("express");
var router = express.Router();
var fs = require('fs');
var path = require('path');

const mongoose = require('mongoose');
// const User = mongoose.model('User');
const Student = mongoose.model('Student');

var root = path.join(__dirname, '../');

function check_admin(req, res, next) {
    if (req.session.admin) {
        next();
    } else {
        req.flash('error', '请登录！');
        return res.redirect('http://anl.sjtu.edu.cn/stars/login');
    }
};

router.get("/admin", check_admin);
router.get("/admin", function (req, res, next) {
    res.render('admin');
});

module.exports = router;

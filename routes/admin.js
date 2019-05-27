// 3rd party modules
var express = require("express");
var router = express.Router();
var fs = require('fs');
var path = require('path');
const multer = require('multer');
const pinyin = require('pinyin');

const mongoose = require('mongoose');
// const User = mongoose.model('User');
const Student = mongoose.model('Student');

const base_url = "http://anl.sjtu.edu.cn/stars";
var root = path.join(__dirname, '../');

const uploadPhoto = multer({dest: path.join(root, 'public/photo'), name: 'photo'});

function check_admin(req, res, next) {
    if (req.session.admin) {
        next();
    } else {
        //req.flash('error', '请登录！');
        return res.redirect(base_url + '/login');
    }
};

router.get("/admin", check_admin);
router.get("/admin", function (req, res, next) {
    Student.find({}).sort({year: -1}).exec(function (err, students) {
        res.render('admin', {
            students: students
        });
    });
});

router.post("/admin", check_admin);
router.post("/admin", uploadPhoto.single('photo'), function (req, res, next) {
    let student = new Student({
        name: req.body.realname,
        year: req.body.year,
        position: parseInt(req.body.position),
        advisor: req.body.advisor,
        now: req.body.now,
        job: req.body.job,
        phone: req.body.phone,
        email: req.body.mail,
        message: req.body.message,
    });
    var name = pinyin(student.name, {
        style: pinyin.STYLE_FIRST_LETTER
    });
    var tt = "";
    for (var j = 0; j < name.length; j++) {
        tt += name[j][0];
    }
    student.letter = tt;
    if (req.file) {
        student.photo = 'photo/' + req.file.filename;
    }
    student.save(function (err) {
        if (err) {
            req.flash("error", err);
            return res.redirect('back');
        } else {
            req.flash("success", "添加成功！");
            return res.redirect('back');
        }
    })
});


router.get("/:id/changeInfo", check_admin);
router.get("/:id/changeInfo", function (req, res, next) {
    Student.findOne({_id: req.params.id}, function (err, student) {
        res.render('change_info', {
            student: student
        });
    });
});


router.post("/:id/changeInfo", check_admin);
router.post("/:id/changeInfo", uploadPhoto.single('photo'), function (req, res, next) {
    Student.findOne({_id: req.params.id}, function (err, student) {
        student.name = req.body.realname;
        student.year = req.body.year;
        student.position = parseInt(req.body.position);
        student.advisor = req.body.advisor;
        student.now = req.body.now;
        student.job = req.body.job;
        student.phone = req.body.phone;
        student.email = req.body.mail;
        student.message = req.body.message;
        var name = pinyin(student.name, {
            style: pinyin.STYLE_FIRST_LETTER
        });
        var tt = "";
        for (var j = 0; j < name.length; j++) {
            tt += name[j][0];
        }
        student.letter = tt;
        if (req.file) {
            student.photo = 'photo/' + req.file.filename;
        }
        student.save(function (err) {
            if (err) {
                req.flash("error", err);
                return res.redirect('back');
            } else {
                req.flash("success", "修改成功！");
                return res.redirect('back');
            }
        })
    });
});


router.post("/:id/delete", check_admin);
router.post("/:id/delete", function (req, res, next) {
    Student.remove({_id: req.params.id}, function (err) {
        if (err) {
            req.flash("error", err);
            return res.redirect("back");
        } else {
            req.flash("success", "删除成功！");
            return res.redirect("back");
        }
    })
});


module.exports = router;

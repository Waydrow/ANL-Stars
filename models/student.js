const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
    name: String,
    year: String, //毕业年份
    position: Number, //学位 博士=1，硕士=2，本科=3
    advisor: String, //导师
    now: String, //现工作/学习的单位
    job: String, //职位
    phone: String, //电话或微信
    email: String, //邮箱
    message: String, //留言
    //照片
    photo: {
        type: String,
        default: 'img/no_avatar.png'
    },
});

mongoose.model('Student', schema);
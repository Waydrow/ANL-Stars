const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
    name: String,
    title: String, //教授/副教授等
    tag: String, //杰青等
    info: String,
    //照片
    photo: {
        type: String,
        default: 'img/no_avatar.png'
    },
});

mongoose.model('Teacher', schema);
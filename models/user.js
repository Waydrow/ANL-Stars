const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    email: String
});

mongoose.model('User', schema);
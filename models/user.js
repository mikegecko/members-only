const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: false},
    role: {type: String, required: true},
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
}, {collection: 'users'});

module.exports = mongoose.model('User', UserSchema);
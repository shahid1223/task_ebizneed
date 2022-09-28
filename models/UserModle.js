const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
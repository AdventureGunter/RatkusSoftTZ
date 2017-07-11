/**
 * Created by User on 10.07.2017.
 */
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps : true});

let Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
/**
 * Created by User on 10.07.2017.
 */
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
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

let Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
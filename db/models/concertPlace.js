/**
 * Created by User on 10.07.2017.
 */
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const concertPlaceSchema = new Schema({
    address: {
        type: String,
        required: true,
        trim: true
    },
    placeName: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps : true});

let ConcertPlace = mongoose.model('ConcertPlace', concertPlaceSchema);

module.exports = ConcertPlace;
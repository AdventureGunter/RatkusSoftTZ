/**
 * Created by User on 10.07.2017.
 */
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const performanceSchema = new Schema({
    concertPlace: {
        type: Schema.Types.ObjectId,
        ref: 'ConcertPlace',
        required: true,
        trim: true
    },
    artist : {
        type: Schema.Types.ObjectId,
        ref: 'A rtist',
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    }
}, {timestamps : true});

let Performance = mongoose.model('Performance', performanceSchema);

module.exports = Performance;
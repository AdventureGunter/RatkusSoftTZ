/**
 * Created by User on 10.07.2017.
 */
let Artist = require('../db/models/artist');
let ConcertPlace = require('../db/models/concertPlace');
let Performance = require('../db/models/performance');

module.exports.getArtists = function (next) {
    return Artist.find()
        .then(artists => artists)
        .catch(err => next(err));
};

module.exports.getConcertPlaces = function (next) {
    return ConcertPlace.find()
        .then(places => places)
        .catch(err => next(err));
};

module.exports.getPerformances = function (next) {
    return Performance.find()
        .then(performances => performances)
        .catch(err => next(err));
};

module.exports.createOrUpdateArtist = function (firstName, lastName, next) {
    return Artist.findOneAndUpdate({firstName: firstName, lastName: lastName},
        {
            firstName: firstName,
            lastName: lastName
        }, {'new': true, upsert : true, returnNewDocument : true})
        .then(artist => artist)
        .catch(err => next(err));
};

module.exports.createOrUpdateConcertPlace = function (address, placeName, next) {
    return ConcertPlace.findOneAndUpdate({address: address, placeName: placeName},
        {
            address: address,
            placeName: placeName
        }, {'new': true, upsert : true, returnNewDocument : true})
        .then(concertPlace => concertPlace)
        .catch(err => next(err));
};

module.exports.createOrUpdatePerformance = function (artist, concertPlace, date, next) {
    return Performance.findOneAndUpdate({artist: artist, date: date},
        {
            artist: artist._id,
            concertPlace:concertPlace._id,
            date: new Date(date)
        }, {'new': true, upsert : true, returnNewDocument : true})
        .then(artist => artist)
        .catch(err => next(err));
};

module.exports.deleteArtist = function (firstName, lastName, next) {
    return Artist.findOneAndRemove({firstName: firstName, lastName: lastName})
        .then(() => ({
            firstName: firstName,
            lastName: lastName
        }))
        .catch(err => next(err));
};

module.exports.deleteConcertPlace = function (address, placeName, next) {
    return ConcertPlace.findOneAndRemove({address: address, placeName: placeName})
        .then(() => ({
            address: address,
            placeName: placeName
        }))
        .catch(err => next(err));
};

module.exports.deletePerformance = function (artist, date, next) {
    return Performance.findOneAndRemove({artist: artist, date: new Date(date)})
        .then(() => ({
            artist: artist,
            date: new Date(date)
        }))
        .catch(err => next(err));
};


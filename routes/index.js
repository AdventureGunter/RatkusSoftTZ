const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');
const sessionController = require('../controllers/sessionController');

router.get('/', function(req, res, next) {
    res.render('index', {title: 'Welcome'});
});

router.get('/performances', function(req, res, next) {
  indexController.getPerformances(next)
      .then(performances => {
          res.send(performances);
      })
      .catch(err => next(err));
});

router.get('/artists', function(req, res, next) {
    indexController.getArtists(next)
        .then(artists => {
            res.send(artists);
        })
        .catch(err => next(err));
});

router.get('/concertPlaces', function(req, res, next) {
    indexController.getConcertPlaces(next)
        .then(concertPlaces => {
            res.send(concertPlaces);
        })
        .catch(err => next(err));
});

router.get('/edit', sessionController.checkSessionForGet, function(req, res, next) {
    res.render('edit');
});

router.post('/artist', sessionController.checkSessionForGet, (req, res, next) => {
  indexController.createOrUpdateArtist(req.body.firstName, req.body.lastName, next)
      .then(() => {
        res.redirect('/artists');
      })
      .catch(err => next(err))
});

router.post('/concertPlace', sessionController.checkSessionForGet, (req, res, next) => {
    indexController.createOrUpdateConcertPlace(req.body.address, req.body.placeName, next)
        .then(() => {
            res.redirect('/concertPlaces');
        })
        .catch(err => next(err))
});

router.post('/performance', sessionController.checkSessionForGet, (req, res, next) => {
    indexController.createOrUpdatePerformance(req.body.artist, req.body.concertPlace, req.body.date, next)
        .then(() => {
            res.redirect('/performances');
        })
        .catch(err => next(err))
});

router.put('/artist', sessionController.checkSessionForGet, (req, res, next) => {
    indexController.createOrUpdatePerformance(req.body.firstName, req.body.lastName, next)
        .then(() => {
            res.redirect('/artists');
        })
        .catch(err => next(err))
});

router.put('/concertPlace', sessionController.checkSessionForGet, (req, res, next) => {
    indexController.createOrUpdatePerformance(req.body.address, req.body.placeName, next)
        .then(() => {
            res.redirect('/concertPlaces');
        })
        .catch(err => next(err))
});

router.put('/performance', sessionController.checkSessionForGet, (req, res, next) => {
    indexController.createOrUpdatePerformance(req.body.artist, req.body.concertPlace, req.body.date, next)
        .then(() => {
            res.redirect('/performances');
        })
        .catch(err => next(err))
});

router.delete('/artist', sessionController.checkSessionForGet, (req, res, next) => {
    indexController.deleteArtist(req.body.firstName, req.body.lastName, next)
        .then(() => {
            req.method = 'GET'; //??????
            res.redirect(200, '/artists'); //?????? why res.redirect('...') does not work...
        })
        .catch(err => next(err))
});

router.delete('/concertPlace', sessionController.checkSessionForGet, (req, res, next) => {
    indexController.deleteConcertPlace(req.body.address, req.body.placeName, next)
        .then(() => {
            console.log('AAAAAAAAAAAAAAAAAAAAAAAA');
            req.method = 'GET';
            res.redirect(200, '/concertPlaces');
        })
        .catch(err => next(err))
});

router.delete('/performance', sessionController.checkSessionForGet, (req, res, next) => {
    indexController.deletePerformance(req.body.artist, req.body.date, next)
        .then(() => {
            req.method = 'GET';
            res.redirect(200, '/performances');
        })
        .catch(err => next(err))
});

module.exports = router;

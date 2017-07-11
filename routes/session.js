const express = require('express');
const router = express.Router();
const passport = require('passport');

const sessionController = require('../controllers/sessionController');

router.get('/', sessionController.checkSessionForGet, function (req, res, next) {
    res.render('session');
});

// LOCAL STRATEGY

router.post('/register', sessionController.checkSessionForGet,
    passport.authenticate('local-register', { successRedirect: '/',
        failureRedirect: '/'})
);

router.post('/login',
    passport.authenticate('local-login', { successRedirect: '/',
        failureRedirect: '/'})
);

// LOGOUT

router.get('/logout', function(req, res, next){
    req.session.destroy(function (err) {
        if (err) next(err);
        else res.redirect('/'); //Inside a callback… bulletproof!
    });
});

module.exports = router;
/**
 * Created by User on 10.07.2017.
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const md5 = require('md5');

const Admin = require('../db/models/admin');

module.exports = function(passport) {
    passport.serializeUser((admin, done) => {
        done(null, admin._id);
    });

    passport.deserializeUser(function (id, done) {
        Admin.findById(id)
            .then(user => done(null, user))
            .catch(err => done(err))
    });

    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function (username, password, done) {
            Admin.findOne({ username: username })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    if (user.password !== md5(password)) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                }).catch(err => done(err));
        }
    ));

    passport.use('local-register', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            Admin.findOneAndUpdate({ username: username }, {
                username: username,
                password: md5(password)
            }, {'new': true, upsert : true, returnNewDocument : true})
                .then(admin => {
                    console.log('Admin ' + admin.username + ' created successfully!');
                    return done(null, admin);
                })
                .catch(err => {
                    console.log(err);
                    done(err)
                });
        }
    ));
};
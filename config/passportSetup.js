const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const db = require('../models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.User.findOne(
        {where: {id: id}
    }).then((user) => {
        done(null, user);
    });
});


passport.use(
    new GoogleStrategy({
    //options for the strat
    callbackURL: '/google/redirect',
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET
    }, (accessToken, refreshToken, profile, done) => {

        db.User.findOne({
            where: {googleId: profile.id}
        }).then(currentuser => {
            if(currentuser){
                console.log('User is:', currentuser);
                done(null, currentuser);
            } else{
                db.User.create({
                    name: profile.name.givenName,
                    googleId: profile.id
                }).then(newUser => {
                    console.log('New User was added: ' + newUser);
                    done(null, newUser);
                });
            }
        });       
       
        console.log('passport callback function fired');
    })
);
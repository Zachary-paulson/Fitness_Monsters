const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const db = require('../models');
const axios = require('axios');

//for testing
//const { google } = require('googleapis');
//const apis = google.getSupportedAPIs();

//console.log("google api: ", apis);

//store the session in a cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.User.findOne(
        {
            where: { id: id }
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
            where: { googleId: profile.id }
        }).then(currentuser => {
            //Determine if the users is already in the db
            if (currentuser) {
                //console.log('User is:', currentuser);
                getSteps(accessToken);
                done(null, currentuser);
            } else {
                //Add new user if not in the db
                db.User.create({
                    name: profile.name.givenName,
                    googleId: profile.id,
                    thumbNail: profile._json.picture
                }).then(newUser => {
                    //console.log('New User was added: ' + newUser);
                    console
                    getSteps(accessToken);
                    done(null, newUser);
                });
            }//end if
        });
    })
);


function getSteps(token) {
    console.log('This is the token', token);
        //let url = 'https://www.googleapis.com/fitness/v1/users/me/dataSources'
    let url = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate'
    axios({
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json;encoding=utf-8',
            'Authorization': 'Bearer ' + token
        }
        , body: {
            aggregateBy: [{
                dataTypeName: 'com.google.step_count.delta'
                //dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
            }],
            bucketByTime: { durationMillis: 86400000 },
            startTimeMillis: 1438705622000,
            endTimeMillis: 1439310422000
        }
    }).then(res => {
        console.log(res)
    }).catch(e => console.log('There was an error:', e));
}





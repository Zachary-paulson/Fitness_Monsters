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
                getSteps(profile.id);
                done(null, currentuser);
            } else {
                //Add new user if not in the db
                db.User.create({
                    name: profile.name.givenName,
                    googleId: profile.id,
                    thumbNail: profile._json.picture
                }).then(newUser => {
                    //console.log('New User was added: ' + newUser);
                    getSteps(profile.id, accessToken);
                    done(null, newUser);
                });
            }//end if
        });

        
        console.log('passport callback function fired');
    })
);


function getSteps(user, token){

    
    let url = 'https://www.googleapis.com/fitness/v1/'+ user + '/me/dataSources';
    axios({
        method: 'GET',
        url: url,
        headers : {
            'Authorization':'Bearer' + token 
        }
    }).then(response => {
        console.log(response);
    }).catch(e => {
        console.log('Oops, there was an Error:', e);
    });

}



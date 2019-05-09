const passport = require('passport');

module.exports = app => {
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    
    app.get('/auth/login', (req, res) => {
        res.render('login');
    });
    
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile']
    }));
    
    app.get('/google/redirect', passport.authenticate('google'), (req, res) => {
        res.redirect('/profile');
    });
}
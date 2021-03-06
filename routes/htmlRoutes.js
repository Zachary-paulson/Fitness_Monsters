const passport = require('passport');

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if the user is not logged in.
    res.redirect('/auth/login');
  } else {
    next();
  }
};
module.exports = app => {
  // Load index page
  app.get("/", (req, res) => {
    res.render('index', {
      user: req.user
    });
  });

  app.get("/joggster", authCheck, (req, res) => {
    res.render('game', {
      user: req.user
    });
  });

  app.get('/profile', authCheck, (req, res) => {
    res.render('profile', {
      user: req.user
    });
  });

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

  app.get('*', (req, res) => {
    res.render('404');
  });
}

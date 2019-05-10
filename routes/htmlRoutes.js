const authCheck = (req, res, next) => {
  if(!req.user){
      //if the user is not logged in.
      res.redirect('/auth/login');
  }else{
      next();
  }
};
module.exports = app => {
  // Load index page
  app.get("/", (req, res) => {
    res.render('index');
  });

  app.get("/joggster", authCheck, (req, res) => {
    res.render('game');
  });
}


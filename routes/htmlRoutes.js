module.exports = app => {
  // Load index page
  app.get("/", (req, res) => {
    res.render('index');
  });
}


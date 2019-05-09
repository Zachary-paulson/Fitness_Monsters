require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 8080;

//modules for passport
const passport = require('passport');
const passportSetup = require('./config/passportSetup');
const cookieSession = require('cookie-session');

//cookie
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[process.env.SESSION_COOKIE_KEY]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
//require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/profileRoutes')(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT,() => {
    console.log("Server listening on: http://localhost:" + PORT);
  });
});

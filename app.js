require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const indexRouter = require('./routes/indexRouter');
const postRouter = require('./routes/postRouter');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const LocalStrategy = require("passport-local").Strategy;
const User = require('./models/user');

// Database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Views
const app = express();
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

// Passport
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({username: username}, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
})

// Routing
app.use('/', indexRouter);
app.use('/posts', postRouter);

app.listen(3000, function() {
  console.log('Server has started');
});
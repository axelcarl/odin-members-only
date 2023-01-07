const User = require("../models/user");
const Post = require('../models/post');
const passport = require("passport");

exports.get = async (req, res) => {
  let users;
  let posts;
  try {
    users = await User.find();
    posts = await Post.find().populate('postedBy');
  } catch (error) {
    console.log(error);
  }
  res.render('index', {
    users: users,
    posts: posts
  });
};

exports.signupForm = (req, res) => {
  res.render('sign-up');
}

exports.signup = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      member: false
    });
    await user.save();
  } catch (error) {
    console.log(error);
  }
  res.redirect('/log-in');
}

exports.loginForm = (req, res) => {
  if (res.locals.currentUser) {
    return res.redirect("/");
  }
  res.render('log-in');
}

exports.login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
});

exports.logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
}

exports.member = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.currentUser);
    user.member = true;
    await user.save();
  } catch (error) {
    console.log(error);
  }
  res.redirect('/');
}

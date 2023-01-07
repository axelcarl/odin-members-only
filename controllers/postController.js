const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      message: req.body.message,
      postedBy: res.locals.currentUser.id
    });
    await post.save();
  } catch (error) {
    console.log(error);
  }
  res.redirect('/');
}
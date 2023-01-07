const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  message: String,
  postedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Post', postSchema);
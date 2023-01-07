const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
  username: String,
  password: String,
  member: Boolean
});

module.exports = mongoose.model('User', userSchema);
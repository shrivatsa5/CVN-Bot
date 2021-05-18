const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: '',
  },
  district: {
    type: String,
    default: '',
  },
  age: {
    type: Number,
    default: 18,
  },
});
module.exports = mongoose.model('User', userSchema, 'User');

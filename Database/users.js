const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: null,
  },
  district: {
    type: String,
    default: null,
  },
  age: {
    type: Number,
    default: 0,
  },
  pincode: {
    type: String,
    default: '',
  },
});
module.exports = mongoose.model('User', userSchema, 'User');

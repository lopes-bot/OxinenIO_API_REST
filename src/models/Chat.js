const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true,
  },
  message:{
    type: String,
  },
  createAt:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('chats',ChatSchema);
const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({

    userId:{
      type: String,
      required: true,
    },
    name:{
      type: String,
    },
    size:{
      type:Number,
    },
    key:{
      type: String,
    },
    url:{
      type: String,
    },
    createAt:{
      type: Date,
      default: Date.now
    }

});

module.exports = mongoose.model('uploads',UploadSchema);
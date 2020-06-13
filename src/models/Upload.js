const mongoose = require('mongoose');
const APP_URL = process.env.APP_URL ||"http://localhost:3000";
const fs = require('fs');
const path = require('path');
const {promisify}= require('util');

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

  UploadSchema.pre('save', function(){
    if(! this.url){
      this.url=`${APP_URL}/files/${this.key}`;
    }
  });

  UploadSchema.pre('remove',function(){
    return promisify(fs.unlink)(path.resolve(__dirname,'..','..',"tmp","uploads",this.key));
  });

module.exports = mongoose.model('uploads',UploadSchema);

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema({
  FullName:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  TypeUser:{
    type:String,
    required: true,
  },
  password:{
    type:String,
    required: true,
  },
  Telephone:{
    type: String,
  },
  CPF:{
    type: String,
  },
  Address:{
    type: String,
  },
  CNPJ:{
    type: String,
  },
  EmailProfessional:{
    type: String,
  },
  AddressBusiness:{
    type: String,
  },
  TelephoneProfessional:{
    type: String,
  },
  
  OccupationArea:{
    type: String,
  },
  Experience:{
    type: String,
  },
  AboutUser:{
    type: String,
  },
  evaluation:{
    type:String,
  },
  profilePicture:{
    type:String,
  }, 
  createAt:{
    type: Date,
    default: Date.now
  }
  
});
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('users', UserSchema);
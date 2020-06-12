const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  FullName:{
    type: String,
    required: true,
  },
  Email:{
    type: String,
    required: true,
  },
  TypeUser:{
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
  
  createAt:{
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('users', UserSchema);
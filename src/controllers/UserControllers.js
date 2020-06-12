const mongoose = require('mongoose');
const User = require('../models/User');
const Uploade = require('../models/Upload');
const Chat = require('../models/Chat');

module.exports = {
 //-----------------------------------------//
 //controle para cadastro de usuario//
  async store(req,res){
    const users = await User.create(req.body);
    res.json({users});
  },
//-----------------------------------------//
//-----------------------------------------//
  async show(req, res){
    const user = await User.findById(req.params.id);
    res.json({user});
  }
}
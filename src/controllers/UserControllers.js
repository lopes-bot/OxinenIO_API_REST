const mongoose = require('mongoose');
const User = require('../models/User');
const Uploade = require('../models/Upload');
const Chat = require('../models/Chat');
const { update } = require('../models/User');

module.exports = {
 //-----------------------------------------//
 //controle para cadastro de usuario//
  async store(req,res){
    const users = await User.create(req.body);
    res.json({users});
  },
//-----------------------------------------//
//-----------------------------------------//
  //controle para buscar usuarios pelo id//
  async show(req, res){
    const user = await User.findById(req.params.id);
    res.json({user});
  },
//----------------------------------------//
  //controle para editar dados do usuario//
  async update(req, res){
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{new: true});
    res.json({user});
  }
}
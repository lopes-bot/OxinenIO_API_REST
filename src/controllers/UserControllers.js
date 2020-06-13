const mongoose = require('mongoose');
const User = require('../models/User');
const Chat = require('../models/Chat');
const Upload = require('../models/Upload');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/index');

signToken = (user) => {

  return JWT.sign(
    {
      iss: "CodeWorkr",
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    JWT_SECRET
  );
};


module.exports = {
 //-----------------------------------------//
 //controle para cadastro de usuario//
  async store(req,res){
    var values = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(values.password, salt);
    values.password = hash;
    
    const users = await User.create(values);
    if(users){
      res.status(200).json({
        erro: false,
        message:"user successfully registered",
      });
    }else{
      res.status(400).json({
        erro: true,
        message:"user registration failure",
      })
    }
  },
//-----------------------------------------//
//-----------------------------------------//
  //controle para buscar usuarios pelo id//
  async show(req, res){
    const user = await User.findById(req.params.id);
    if(user){
      res.json({user});
    }else{
      res.status(400).json({
        erro:true,
        message:"User not found",
      })
    }
    
  },
//----------------------------------------//
  //controle para editar dados do usuario//
  async update(req, res){
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{new: true});
    if(user){
      res.status(200).json({
        erro: false,
        message:"Successfully changed data",
      });
    }else{
      res.status(400).json({
        erro: true,
        message: "error when updating",
      })
    }
  },
//-----------------------------------------//
//controle para listar usuarios com limite de 10 por paginas//
  async index(req,res){
    const{page = 1} = req.query;
    const users = await User.paginate({},{page, limit: 10});
    if(users){
      res.json({users});
    }else{
      res.status(400).json({
        erro: true,
        message:"there are no users registered on the data base",
      });
    }
    
  },
//------------------------------------------//
//-----------------------------------------------------//
 async delete(req,res){
   const user = await User.findByIdAndRemove(req.params.id);
   if(user){
     res.json({
       erro: false,
       message:"user successfully deleted",
     })
   }else{
     res.status(400).json({
       erro: true,
       message:"it was not possible to delete the user",
     })
   }
 },
 
 //--------------------------------------------------------------//
 //controle para login
 async secret(req,res,next){

    const token = signToken(req.user);
    return res.status(200).json({
      token,
      email:req.user.email,
    }) 
  
 },

 async logout(req,res){
   req.logout();
   res.send("pagina principal");
 },
 //-------------------------------------------------------//
 // controle para lista todos os uploads de fotos//
 async showUpload(req, res){
   const photos = await Upload.find();
   return res.json(photos);
 },
 //-----------------------------------------------------------//
  //controle para uplode de fotos//
  async uploads(req ,res){
   
    const {originalname: name ,size ,filename:key }= req.file;
    const photos = await Upload.create({
      name,
      size,
      key,
      url:"",
      userId: req.params.id,
    })
    return res.json(photos);
  },
  //--------------------------------------------------------------//
 //-----------------------------------------------------------//
 //controle para deleter upload//
 async delUpload(req, res){
   const photo = await Upload.findById(req.params.id);
   await photo.remove();
   return res.json({
     erro: false,
     message:"photo removed",
   })
 }

}
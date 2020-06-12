const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
  passport.use(
    new LocalStrategy(
    {
      usernameField:"email",
      passwordField:"password",
    },
    async(email,password,done)=>{
        try{
          const user = await User.findOne({email: email});
        
          if(!user){
            return done(null, false);
          }
        
         bcrypt.compare(password, user.password,(err,success)=>{
           if(success){
             return done(null, user);
           }else{
             return done(null,false,{
               message:"incorrect password"
             })
           }

         })

        }catch(error){
          return done(error, false); 

        }
     }

    )
    
  );
  passport.serializeUser((user, done)=>{

    done(null, user.id)
  })


  passport.deserializeUser((id,done)=>{
      User.findById(id,(err,user)=>{
          done(err,user)
      })
  })

}
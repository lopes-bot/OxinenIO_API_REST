const mongoose = require('mongoose');
const User = require("../models/User");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      }, // parametros passado na requisição que serao uasado na validação
      (email, password, done) => {
        //console.log("esse e o email:" + email);
        User.findOne({
          where: { email: email },
        }).then((usuario) => {
          //console.log(usuario);
          if (!usuario) {
            return done(null, false, {
              message: "User does not exist!",
            });
          } // se o usuario nao exitir
          bcrypt.compare(password, usuario.password, (erro, batem) => {
            if (batem) {
              // se as senha forem iguais retorna o usuario
              return done(null, usuario);
            } else {
              //retorna que nao existe usuario
              return done(null, false, {
                message: "incorrect password",
              });
            }
          }); //função para compara as senha criptografadas com o bcrypt
        }); //busca no banco de dados o usuario aparti dos dados de requição email e senha
      }
    )
  ); //estrategia local capara o login

  passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
  }); //o serializeUser determina quais dados do objeto de usuário devem ser armazenados na sessão

  passport.deserializeUser((id, done) =>{
        User.findById(id,(err, usuario)=>{
          done(err,usuario);
        })
  }   
  ); //deserializeUser corresponde à chave do objeto de usuário que foi dada à done
};
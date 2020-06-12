const express = require('express');
const Port = 3000;
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require('./auth/passport')(passport);

//iniciando app
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(require("./routes"));
app.use(morgan('dev'));
//mongoose  config
mongoose.connect('mongodb://localhost:27017/oxigenIO',{
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
//config session
app.use(session({
      secret: "oxigenIO",
      resave: true,
      saveUninitialized: true,
}));
//config do passport
app.use(passport.initialize());
app.use(passport.session());

//config do middleware
app.use((req, res, next) => {
 
  res.locals.user = req.user || null; //dados do usuario autenticado pelo passport e armazenado nessa variavel global
  next();
});

app.listen(Port,()=>{
  console.log(`serve run http://localhost:${Port}`);
})
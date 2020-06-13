const express = require('express');
const PORT = process.env.PORT||3000;
const MONGO_URL = process.env.MONGO_URL||"mongodb://localhost:27017/oxigenIO";
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
require('./auth/passport')(passport);


//iniciando app
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(require("./routes"));
app.use(morgan('dev'));
//mongoose  config
mongoose.connect(MONGO_URL,{
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
app.use('/files', express.static(path.resolve(__dirname,'..',"tmp","uploads")));

app.listen(PORT,()=>{
  console.log(`serve run http://localhost:${PORT}`);
})
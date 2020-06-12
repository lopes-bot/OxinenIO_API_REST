const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const UserControllers = require('./controllers/UserControllers');


routes.post("/posts",multer(multerConfig).single('file'),(req,res)=>{
  console.log(req.file);
  res.json({Hello:"Word"});
});
routes.post("/users", UserControllers.store);
routes.get("/users/:id", UserControllers.show);


module.exports = routes; 
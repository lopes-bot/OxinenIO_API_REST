const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const UserControllers = require('./controllers/UserControllers');
const passport = require('passport');

//----------------------------------------------------------------------------------------//
//routas de uploads
routes.post("/photos/:id",multer(multerConfig).single('file'),UserControllers.uploads);
routes.get("/showUploads", UserControllers.showUpload);
routes.delete("/deleteUpload/:id", UserControllers.delUpload);
routes.get("/showUPloadsUser/:id", UserControllers.userUpload);
//---------------------------------------------------------------//
//routas de usuarios
routes.post("/users", UserControllers.store);
routes.get("/users/:id", UserControllers.show);
routes.put("/users/:id", UserControllers.update);
routes.get("/users",UserControllers.index);
routes.delete("/users/:id", UserControllers.delete);
routes.post("/users/Address", UserControllers.address);
//---------------------------------------------------------------//
//rotas de autenticação
routes.route("/login").post(passport.authenticate("local", { session: false}),UserControllers.secret);
routes.get("/logout",UserControllers.logout);


module.exports = routes; 
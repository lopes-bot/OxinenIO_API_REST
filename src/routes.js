const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const UserControllers = require('./controllers/UserControllers');
const passport = require('passport');


routes.post("/photos/:id",multer(multerConfig).single('file'),UserControllers.uploads);
routes.post("/users", UserControllers.store);
routes.get("/users/:id", UserControllers.show);
routes.put("/users/:id", UserControllers.update);
routes.get("/users",UserControllers.index);
routes.delete("/users/:id", UserControllers.delete);
routes.route("/login").post(passport.authenticate("local", { session: false}),UserControllers.secret);


module.exports = routes; 
const routes = require('express').Router();


routes.get("/",(req,res)=>{
  res.json({Hello:"Word"});
});


module.exports = routes; 
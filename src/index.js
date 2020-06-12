const express = require('express');
const Port = 3000;
const morgan = require('morgan');
//iniciando app
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(require("./routes"));
app.use(morgan('dev'));

app.listen(Port,()=>{
  console.log(`serve run http://localhost:${Port}`);
})
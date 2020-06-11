const express = require('express');
const Port = 3000;
//iniciando app
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(require("./routes"))

app.listen(Port,()=>{
  console.log(`serve run http://localhost:${Port}`);
})
const express = require('express');
const Port = 3000;
//iniciando app
const app = express();

//rotas
app.get("/",(req,res)=>{
  res.send("Hello Word");
})

app.listen(Port,()=>{
  console.log(`serve run http://localhost:${Port}`);
})
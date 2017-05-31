const express = require('express');
const pets = require('./pets');

const app = express();

app.get('/', handleGetRoot);

app.listen(8000, ()=>{console.log('Listening on port 8000');});

function handleGetRoot(req, res){
  
}
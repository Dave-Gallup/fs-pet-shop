const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app     = express();
const port    = 8000;

app.get('/pets', (req, res)=>{
  fs.readFile(`${__dirname}/pets.json`, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    res.send(JSON.parse(petsJSON));
  });
});

app.get('/pets/:index', (req, res)=>{
  fs.readFile(`${__dirname}/pets.json`, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    var pets = JSON.parse(petsJSON)

    if(req.params.index < 0 || req.params.index > pets.length -1){
      res.status(404);
      res.setHeader('content-type', 'text/plain');
      res.send('Not Found')
    }
    res.send(pets[req.params.index]);
  });
});

app.listen(port, ()=>{console.log('Listening on port', port);});



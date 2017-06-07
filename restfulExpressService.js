const express     = require('express');
const bodyParser  = require('body-parser');
const logger      = require('morgan');
const fs          = require('fs');

var app   = express();
var port  = 8000;
var dataFile = `${__dirname}/pets.json`

app.use(bodyParser.json());
app.use(logger('short'));

//query
app.get('/pets', (req, res) =>{

  fs.readFile(dataFile, 'utf8', (err, content) =>{
    if (err) {
      throw err;
    }

    res.send(JSON.parse(content));
  });
});

//read
app.get('/pets/:id', (req, res) =>{
  let index = req.params.id;

  fs.readFile(dataFile, 'utf8', (err, content) =>{
    if (err) {
      throw err;
    }
    var pets = JSON.parse(content);

    if(pets && (index < 0 || index > pets.length -1)){
      res.setHeader('Content-Type', 'text/plain');
      res.status(404).send('Not Found');
      return;
    }

    res.send(pets[index]);
  });
});

//update
app.patch('/pets/:id', (req, res) =>{
  let changes = req.body;
  let index = req.params.id;

  fs.readFile(dataFile, 'utf8', (err, content) =>{
    if (err) {
      throw err;
    }
    var pets = JSON.parse(content);
    if(changes.age !== undefined){
      changes.age = Number(changes.age);
    }
    pets[index] = Object.assign(pets[index], changes);

    fs.writeFile(dataFile, JSON.stringify(pets), (err)=>{
      if(err){
        throw err;
      }
      res.send(pets[index]);
    });
  });
});

//destroy
app.delete('/pets/:id', (req, res) =>{
  let index = req.params.id;

  fs.readFile(dataFile, 'utf8', (err, content) =>{
    if (err) {
      throw err;
    }
    var pets = JSON.parse(content);

    var pet = pets.splice(index, 1);

    fs.writeFile(dataFile, JSON.stringify(pets), (err)=>{
      if(err){
        throw err;
      }
      res.send(pet[0]);
    });
  });
});

//create
app.post('/pets/', (req, res) =>{
  let newPet = req.body;

  if(!newPet || !newPet.age || !newPet.kind || !newPet.name){

    res.setHeader('Content-Type', 'text/plain');
    res.status(400).send('Bad Request');
    return;
  }

  fs.readFile(dataFile, 'utf8', (err, content) =>{
    if (err) {
      throw err;
    }
    var pets = JSON.parse(content);
    if(newPet.age !== undefined){
      newPet.age = Number(newPet.age);
    }
    pets.push(newPet);

    fs.writeFile(dataFile, JSON.stringify(pets), (err)=>{
      if(err){
        throw err;
      }
      res.send(newPet);
    });
  });
});



app.listen(port, ()=>{console.log('Listening on port', port);});

module.exports = app;
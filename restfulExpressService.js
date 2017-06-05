const express     = require('express');
const bodyParser  = require('body-parser');
const logger      = require('morgan');

const Repo = require('./petsRepo.js');

var app   = express();
var port  = 8000;

var repo = new Repo();

app.use(bodyParser.json());
app.use(logger('short'));

//query
app.get('/pets', (req, res) =>{
  res.send(repo.readRepo());
});

//read
app.get('/pets/:id', (req, res) =>{
  let index = req.params.id;
  res.send(repo.readRepo(index));
});

//update
app.patch('/pets/:id', (req, res) =>{
  let changes = req.body;
  let index = req.params.id;

  res.send(repo.updatePet(index, changes));
});

//destroy
app.delete('/pets/:id', (req, res) =>{
  let index = req.params.id;

  res.send(repo.removePet(index));
});

//create
app.post('/pets/', (req, res) =>{
  let newPet = req.body;
  let pet = repo.createPet(newPet);
  if(!pet){
    res.sendStatus(500);
    return;
  }
  res.status(201).send(pet);
});



app.listen(port, ()=>{console.log('Listening on port', port);});

module.exports = app;
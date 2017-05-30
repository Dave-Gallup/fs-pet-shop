const fs    = require('fs');
const path  = require('path');

var baseDir = path.dirname(process.argv[1]);
var pets;
fs.readFile(`${baseDir}/pets.json`, (err, data) => {
  if(err) throw err;
  pets = JSON.parse(data);
  processMain();
})

function processMain(){
  switch (process.argv[2]){
    case 'read':
      processRead();
      break;
    case 'create':
      processCreate();
      break;
    case 'update':
      processUpdate();
      break;
    case 'destroy':
      processDestroy();
      break;
    default:
      console.error('Usage: node pets.js [read | create | update | destroy]');
      process.exit(1);
  }
}

function processRead(){
  if (process.argv[3] === undefined){
    console.log(pets);
  }
  else if(process.argv[3] >= pets.length || process.argv[3] < 0){
    console.error('Usage: node pets.js read INDEX');
    process.exit(1);
  }
  else{
    console.log(pets[process.argv[3]]);
  }
}

function processCreate(){
  checkNArgs(3, 'Usage: node pets.js create AGE KIND NAME');

  let newPet = {'age': parseInt(process.argv[3]), 'kind': process.argv[4], 'name': process.argv[5]};
  pets.push(newPet);

  fs.writeFile(`pets.json`, JSON.stringify(pets), (err)=>{
    if(err) throw err;
  });

  console.log(newPet);
}

function processUpdate(){
  checkNArgs(4, 'Usage: node pets.js update INDEX AGE KIND NAME');

  let pet = pets[process.argv[3]];
  pet.age = parseInt(process.argv[4]);
  pet.kind = process.argv[5];
  pet.name = process.argv[6];

  fs.writeFile(`pets.json`, JSON.stringify(pets), (err)=>{
    if(err) throw err;
  });

  console.log(pet);
}

function processDestroy(){
  checkNArgs(1, 'Usage: node pets.js destroy INDEX');

  if(process.argv[3] >= pets.length || process.argv[3] < 0){
    console.error('Usage: node pets.js destroy INDEX');
    process.exit(1);
  }
  console.log(pets[process.argv[3]]);
  pets.splice(process.argv[3], 1);

  fs.writeFile(`pets.json`, JSON.stringify(pets), (err)=>{
    if(err) throw err;
  });
}

function checkNArgs(numArgs, errorMessage){
  for(let i = 3; i < numArgs + 3; i++){
    if(process.argv[i] === undefined){
      console.error(errorMessage);
      process.exit(1);
    }
  }
}


const fs = require('fs');

class Repo{

  constructor(){
    this.nextIndex = -1;
    this.pets = [];
  }

  readRepo(index){

    if(index === undefined || Number.isNaN(index)){
      return this.pets;
    }
    if(index < 0 || index > this.pets.length){
      return undefined;
    }
    return this.pets[index];
  }

  createPet(newPet){

    if(!newPet.name || !newPet.kind || !newPet.age){
      return undefined;
    }
    this.nextIndex++;
    this.pets[this.nextIndex] = {
      'id': this.nextIndex,
      'name': newPet.name,
      'kind': newPet.kind,
      'age': newPet.age
    }
    return this.pets[this.nextIndex];
  }

  updatePet(index, changes){

    var pet = this.readRepo(index);
    if(!pet){
      return undefined;
    }

    for(let key of Object.keys(changes)){
      pet[key] = changes[key];
    }

    return pet;
  }

  removePet(index){

    var pet = this.readRepo(index);
    if(!pet){
      return undefined;
    }

    this.pets.splice(index, 1);

    return pet;
  }

} //END class

module.exports = Repo;

// var repo = new Repo();
// console.log('list>>> ',repo.readRepo());
// console.log('make 0 >>> ',repo.createPet({'name':'Alex', 'kind':'dog','age':4}));
// console.log('make 1 >>> ',repo.createPet({'name':'Bob', 'kind':'cat','age':6}));
// console.log('list>>> ',repo.readRepo());
// console.log('read 0 >>> ',repo.readRepo(0));
// console.log('read 1 >>> ',repo.readRepo(1));
// console.log('change 1 >>> ',repo.updatePet(1,{'age':7}));
// console.log('delete 0 >>> ',repo.removePet(0));
// console.log('list>>> ',repo.readRepo());











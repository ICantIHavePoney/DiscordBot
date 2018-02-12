let fs = require("fs");

function Run(client, message, args){

checkDirectory("./Datas/" + message.author.username, )

console.log(directoryExist);

}

function main(error){
  if(error){
    console.error(error);
  }
  else{
    let playerDatas = require("../Datas/" + message.author.username + "/character.json");
  }
}


function checkFile(path, callback){
  fs.stat(path, function(err, stats){
    if(err && err.code == "ENOENT"){
      playerSampleDatas = {
        "Nom" : "",
        "Prénom" : "",
        "Argent" : "",
        "Jeton de l'Eris" : "",
        "Hangar" : [],
        "Pilotage" : {
          "Petits Vaisseaux" : 0,
          "Grand Vaisseaux" : 0
        },
        "Générales" : {
          "Exploration": 0,
          "Architecture": 0,
          "Militaire": 0,
          "Minage": 0
        },
        "Chantier" : {
          "Construction": 0,
          "Electricité": 0,
          "Maintenance": 0,
          "Armement": 0
        },
        "autre" : {
          "Culture": 0
          "Holothèque lues":
        }
      }
    }
  });

}


function checkDirectory(path, callback){
  fs.stat(path, function(err, stats) {
    if(err && err.code == 'ENOENT'){
      fs.mkdir(path, callback);
    }
    else{
      callback(err);
    }
  });
}

exports.run = Run;

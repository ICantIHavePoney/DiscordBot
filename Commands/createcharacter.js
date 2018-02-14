let Command = require("./Command.js");


class createcharacter extends Command{
  run(message, args){

    let logChannel = message.guild.channels.find("name", this.bot.config.logChannel);
    if(!logChannel){
      logChannel = message.channel;
    }

    if(args.length != 2){
      message.author.send("Les arguments de votre commande ne sont pas valides");
      logChannel.send(message.author.username + " a essayé d'enregistrer un personnage, mais les paramètres n'étaient pas valides");
      return;
    }

    let playerSampleDatas = {
      "Joueur" : message.author,
      "Nom" : args[0],
      "Prenom" : args[1],
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
        "Culture": 0,
        "Holothèque lues": ""
      }
    }

    //console.log(this.bot.dataBase.collection("Characters"));

    this.bot.dataBase.collection("Characters").find({"Nom" : playerSampleDatas.Nom, "Prénom" : playerSampleDatas.Prenom}, (error, result) =>{
      if(error) return console.log(error);
      console.log(result);
      /*if(!result){
        this.bot.dataBase.collection("Characters").insert(playerSampleDatas, null, (error, results) => {
          if(error) return console.log(error);
          console.log("Elément inséré");
        });
      }
      else{
        console.log("toto");
      }*/
    });

    //console.log(playerSampleDatas);
  }
}




module.exports = createcharacter

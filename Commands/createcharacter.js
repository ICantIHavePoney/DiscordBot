let Command = require("./Command.js");
let Character = require("./Character.js");



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

    let playerDatas = new Character(message.author.username, args[0], args[1]);

    let collection = this.bot.dataBase.collection("Characters");

    collection.find({"firstName" : args[0], "lastName" : args[1]}).toArray((err, items) =>{
      if(err){
        return console.error(err);
    } 
    if(items.length == 0){
        collection.insert(playerDatas, null, (error, results)=>{
            if(error){
                return console.log(error);
            }
            console.log("élément inséré");
        });
    }
    })
  }
}

module.exports = createcharacter

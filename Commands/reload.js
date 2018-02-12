const fs = require("fs");

let config = require("../config.json");

exports.accessLevel = config.adminRole;

exports.needHiding = true;

exports.run = (client, message, args) =>{

  logChannel = message.guild.channels.find("name", config.logChannel);
  if(!logChannel){
    logChannel = message.channel;
  }

    fs.readdir("./Commands/", (err, files) => {
      if(err) return console.error(err);

      files.forEach(file =>{
        delete require.cache[require.resolve("./"+ file)];
      });
    });
    console.log("Les commandes ont été rafraichies");
    logChannel.send("Les commandes ont été rafraichies")
}

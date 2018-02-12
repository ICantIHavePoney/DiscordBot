let Command = require("./Command.js");
let fs = require("fs");

class reload extends Command{

    run(message, args) {

      let logChannel = message.guild.channels.find("name", this.bot.config.logChannel);
      if(!logChannel){
        logChannel = message.channel;
      }
      this.bot.commands = {};

      fs.readdir("./Commands/", (err, files) => {
        if(err) return console.error(err);

        files.forEach(file =>{

          delete require.cache[require.resolve("./"+ file)];
        });
      });


      this.bot.registerCommands();

      console.log("Les commandes ont été rafraichies");
      logChannel.send("Les commandes ont été rafraichies")
    }
  }

module.exports = reload;

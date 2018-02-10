let Discord = require("discord.js");
let client = new Discord.Client();

let fs = require("fs");

let config = require("./config.json");

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if(message.author.bot || message.content.indexOf(config.prefix) != 0) return;


    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);

    let command = args.shift().toLowerCase();


    try{
      let commandFile = require("./Commands/"+ command + ".js");
      if(CanRun(commandFile, message)){
        commandFile.run(client, message, args);
      }

    }catch (err){
      console.error(err);
    }
    message.delete(100);

  });

function CanRun(commandFile, message){

  adminRole = message.guild.roles.find("name", config.adminRole);
  gameMasterRole = message.guild.roles.find("name",config.gameMasterRole);
  logChannel = message.guild.channels.find("name", config.logChannel);

  if(!logChannel){
    message.guild.createChannel(config.logChannel, "text");
    logChannel = message.channel;
    logChannel.send("You didn't have a log channel, so I created one for ya !");
  }

  if(commandFile.accessLevel == config.adminRole && !adminRole){
    logChannel.send("The admin role doesn't exist, so you can't use admin commands");
    return false;
  }

  if(commandFile.accessLevel == config.gameMasterRole && !gameMasterRole){
    logChannel.send("The game master role doesn't exist, so you can't use game master commands");
    return false;
  }

  switch(commandFile.accessLevel){
    case config.adminRole:
      if(message.member.roles.has(adminRole.id)){
        return true;
      }
      else{
        message.author.send("You don't have the right to use this !");
        return false;
      }        
      break;
    case config.gameMasterRole : 
      if(message.member.roles.has(gameMasterRole.id) || message.member.roles.has(adminRole.id)){
        return true;
      }
      else{
        message.author.send("You don't have the right to use this !");
        return false;
      }
      break;
  }
  return true;
}

client.login(config.token);

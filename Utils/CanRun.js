let enums = require("../Enums.js");

function CanRun(commandFile, message, config){
    
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
    case enums.AccessLevel.Admin:
      if(message.member.roles.has(adminRole.id)){
        return true;
      }
      else{
        message.author.send("You don't have the right to use this !");
        return false;
      }
      break;
    case enums.AccessLevel.GameMaster :
      if(message.member.roles.has(gameMasterRole.id) || message.member.roles.has(adminRole.id)){
        return true;
      }
      else{
        message.author.send("You don't have the right to use this !");
        return false;
      }
      break;
  }
}


module.exports = CanRun;
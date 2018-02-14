let enums = require("../Enums.js");

function CanRun(commandFile, message, config){
    
  adminRole = message.guild.roles.find("name", config.adminRole);
  gameMasterRole = message.guild.roles.find("name",config.gameMasterRole);
  logChannel = message.guild.channels.find("name", config.logChannel);

  if(!logChannel){
    message.guild.createChannel(config.logChannel, "text");
    logChannel = message.channel;
    logChannel.send("Le canaux de logs n'existe pas, je vous en crée un!");
  }

  if(commandFile.accessLevel == config.adminRole && !adminRole){
    logChannel.send("Le rôle d'administrateur n'existe pas ! Vous ne pouvez pas utiliser les commandes admins !");
    return false;
  }

  if(commandFile.accessLevel == config.gameMasterRole && !gameMasterRole){
    logChannel.send("Le rôle de maitre de jeu n'existe pas ! Vous ne pouvez pas utiliser les commandes maitre de jeu !");
    return false;
  }

  switch(commandFile.config.accessLevel){
    case enums.AccessLevel.Admin:
      if(message.member.roles.has(adminRole.id)){
        return true;
      }
      else{
        message.author.send("Vous n'avez pas le droit d'utiliser cette commande !");
        return false;
      }
      break;
    case enums.AccessLevel.GameMaster :
      if(message.member.roles.has(gameMasterRole.id) || message.member.roles.has(adminRole.id)){
        return true;
      }
      else{
        message.author.send("Vous n'avez pas le droit d'utiliser cette commande !");
        return false;
      }
      break;
  }
}

module.exports = CanRun;
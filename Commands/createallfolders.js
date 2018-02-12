let fs = require("fs");
let config = require("../config.json");

exports.needHiding = true;

exports.accessLevel = config.adminRole;

exports.run = (client, message, args)=>{

  logChannel = message.guild.channels.find("name", config.logChannel);
  members = message.guild.members.array();

  for(i in members){
    if(!members[i].user.bot){
      CreateFolder(members[i]);
    }
  }

  logChannel.send("Tous les dossiers ont été créés !");
}


function CreateFolder(member){
  fs.stat("./Datas/" + member.user.username, (error) => {
    if(error && error.code == "ENOENT"){
      fs.mkdir("./Datas/" + member.user.username, (error) => console.error(error));
    }
  });
}

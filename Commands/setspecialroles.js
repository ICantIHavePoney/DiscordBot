let config = require("../config.json");
const fs = require("fs");

function Run(client, message, args){



    //console.log(config.specialRoles);

    for(arg in args) {
        let roleDatas = message.guild.roles.find("name", args[arg]);
        
        config.specialRoles.push( 
        {
            "name" : roleDatas.name,
             "relatedFolder" : "../" + roleDatas.name
        });

    }

   // config.specialRoles = roleToAdds

    var json = JSON.stringify(config);

    console.log(config);

    fs.writeFile("../config.json", json, "utf8", null);


}


exports.run = Run;
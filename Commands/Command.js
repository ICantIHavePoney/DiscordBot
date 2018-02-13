let enums = require("../Enums.js");

class Command{

    constructor(config, bot){
        this.config = config;
        this.bot = bot;
        this.initialise();
    }

    initialise(){
        this.initialised = new Promise((resolve, reject) =>{
            let command = this;
            resolve(command);
        })
    }

}


module.exports = Command;
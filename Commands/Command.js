let enums = require("../Enums.js");

class Command{

    constructor(config, bot){
        this.config = config;
        this.bot = bot;
    }

    initialise(){
        this.initialised = new Promise((resolve, reject) =>{
            resolve();
        })
    }

}


module.exports = Command;
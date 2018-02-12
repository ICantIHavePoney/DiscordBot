let Discord = require("discord.js");
let canRun = require("./utils/CanRun.js");
let enums = require("./Enums.js");

class Bot{

    constructor(config){
      this.client = new Discord.Client();
      this.config = config;

      this.commands = {};

      this.registerCommands();
      this.loadClientEvents();
      this.loginClient();

    }

    registerCommands(){
      let commandClass, commandName;
      let configCommands = this.config.commands;
      for (commandName in this.config.commands) {
          commandClass = require("./Commands/"+ commandName + ".js");
          this.commands[commandName] = new commandClass(configCommands[commandName], this);
      }
    }

    loadClientEvents(){
      this.client.on("ready", this.sendReady.bind(this));
      this.client.on("message", this.handleMessage.bind(this));
    }

    handleMessage(message){
      if(message.author.bot || message.content.indexOf(this.config.prefix) != 0) return;

      let args = message.content.slice(this.config.prefix.length).trim().split(/ +/g);

      let command = args.shift().toLowerCase();

      try{
        let commandFile = this.commands[command];
        console.log(commandFile.config.accessLevel);
        if(commandFile.config.accessLevel == enums.AccessLevel.All || canRun(commandFile, message, this.config)){
          commandFile.run(message, args);
        }
        if(commandFile.config.needHiding){
          message.delete(100);
        }
      }catch (err){
        console.error(err);
      }
    }

    sendReady(){
      console.log("I am ready!");
    }

    loginClient(){
      this.client.login(this.config.token);
    }
}

module.exports = Bot;

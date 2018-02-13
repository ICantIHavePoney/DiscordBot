let Discord = require("discord.js");
let canRun = require("./utils/CanRun.js");
let enums = require("./Enums.js");
let mongoClient = require("mongodb").MongoClient;
let chalk = require("chalk");

let okay = chalk.bold.greenBright;

class Bot{

    constructor(config){
      this.loadConfigurations(config)
      .then(this.connectExternal)
      .then(this.registerCommands)
      .then(()=>{
        console.log("       Systèmes : [" + okay("OK") + "]");
        console.log("Base de données : [" + okay("OK") + "]");
      });


    }


    loadConfigurations(config){
      let bot = this;
      console.log("this : " + JSON.stringify(this));
      return new Promise((resolve, reject) => {
        console.log("Chargement des fichiers de configurations");

        bot.config = config;
        resolve(bot);
      });
    }

    connectExternal(bot){
      console.log("Fichiers de configurations chargés");
      console.log("Connexion aux systèmes externes");
      bot.connectDatabase(bot);
      bot.client = new Discord.Client();
      bot.loadClientEvents(bot);
      bot.loginClient(bot)
      return Promise.all([
        bot.dbConnected,
        bot.discordInitialized
      ]);

    }

    registerCommands(bot){
      console.log("Enregistrement des commandes utilisateurs");
      let promises = [];
      bot.commands = {};
      
      console.log(bot.config);

      let commandClass, commandName;
    
      /*for (commandName in bot.config.commands) {
          commandClass = require("./Commands/"+ commandName + ".js");

          bot.commands[commandName] = new commandClass(bot.config.commands[commandName], bot);
          promises.push(bot.commands[commandName].initialized.then(() =>{
            console.log(commandName);
          }));
      }
      return Promise.all(promises);*/
    }

    connectDatabase(bot){
      console.log("Connexion à la base de donnée");

      bot.dbConnected = new Promise((resolve, reject) =>{
        mongoClient.connect(bot.config.DbUrl, function(error, db){
          if(error){
            reject();
            return console.log(error);
          }         
          console.log("Connexion à la base de donnée établie");
          resolve(bot);
        });
      })
    }

    loadClientEvents(bot){
      console.log("Enregistrement des évènements utilisateurs");
      bot.discordInitialized = new Promise((resolve) => {
        bot.client.on("ready", () =>{
          console.log("Client Discord initialisé. Près à être utilisé");
          resolve(bot);
        });
      });

      this.client.on("message", bot.handleMessage.bind(bot));

      console.log("évènements utilisateurs enregistrés");
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

    loginClient(bot){
      bot.client.login(bot.config.token);
      console.log("Bot connecté au serveur Discord");
    }
}

module.exports = Bot;

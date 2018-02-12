let Command = require("./Command.js");


class ping extends Command{
    run(message, args) {
        message.channel.send("pong! ").catch(console.error);
    }
}


module.exports = ping;

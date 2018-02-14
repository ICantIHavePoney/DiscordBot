let Command = require("./Command.js");


class ping extends Command{
    run(message, args) {
        message.channel.send("pong! BOOM !").catch(console.error);
    }
}


module.exports = ping;

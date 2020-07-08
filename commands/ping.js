module.exports = {
    help: {
        name: "ping",
        aliases: ["pong"]
    },
    run: async (client, message, args) => {
        return message.channel.send(`🏓 | Pong! \`${Math.round(client.ws.ping)}ms\``);
    }
};
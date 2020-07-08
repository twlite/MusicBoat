module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;
    if (message.content.indexOf(client.prefix) !== 0) return;

    let args = message.content.slice(client.prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();
    const commandFile = client.commands.get(command) || client.aliases.get(command);
    if (!commandFile) return;
    try {
        commandFile.run(client, message, args);
    } catch(e) {
        return message.channel.send(`❌ | Something went wrong while running **${command}**!\`\`\`xl\n${e.message}\`\`\``);
    }
};
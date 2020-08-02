// Custom filter (not available on discord-player)
// check config file for example

module.exports = {
    help: {
        name: "speedup",
        aliases: []
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        if (!client.player.isPlaying(message.guild.id)) {
            return message.channel.send("❌ | I'm not playing anything?");
        }
        const speedup = await client.player.getQueue(message.guild.id).filters["speedup"];
        client.player.setFilters(message.guild.id, {
            "speedup": !speedup
        });
        return message.channel.send(`✅ | Player speed set to ${!speedup ? "1.3x" : "1x"}!`);
    }
};

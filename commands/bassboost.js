module.exports = {
    help: {
        name: "bassboost",
        aliases: ["bass"]
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        if (!client.player.isPlaying(message.guild.id)) {
            return message.channel.send("❌ | I'm not playing anything?");
        }
        let bass = await client.player.getQueue(message.guild.id).filters.bassboost;
        client.player.setFilters(message.guild.id, {
            bassboost: !bass
        });
        message.guild.bassboost = !message.guild.bassboost;
        return message.channel.send(`✅ | Bassboost ${!bass ? "Enabled" : "Disabled"}!`)
    }
};

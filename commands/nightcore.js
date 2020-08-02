module.exports = {
    help: {
        name: "nightcore",
        aliases: []
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        if (!client.player.isPlaying(message.guild.id)) {
            return message.channel.send("❌ | I'm not playing anything?");
        }
        const ncEnabled = await client.player.getQueue(message.guild.id).filters.nightcore;
        client.player.setFilters(message.guild.id, {
            nightcore: !ncEnabled
        });
        return message.channel.send(`✅ | Nightcore ${!ncEnabled ? "Enabled" : "Disabled"}!`)
    }
};

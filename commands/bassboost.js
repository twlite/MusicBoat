module.exports = {
    help: {
        name: "bass",
        aliases: ["bassboost"]
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        if (!client.player.isPlaying(message.guild.id)) {
            return message.channel.send("❌ | I'm not playing anything?");
        }
        const bassboostEnabled = await client.player.getQueue(message.guild.id).filters.bassboost;
        client.player.setFilters(message.guild.id, {
            bassboost: !bassboostEnabled
        });
        return message.channel.send(`✅ | Bassboost ${!bassboostEnabled ? "Enabled" : "Disabled"}!`)
    }
};

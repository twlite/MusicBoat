module.exports = {
    help: {
        name: "loop",
        aliases: []
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        if (!client.player.isPlaying(message.guild.id)) {
            return message.channel.send("❌ | I'm not playing anything?");
        }
        let mode = await client.player.getQueue(message.guild.id).repeatMode;
        await client.player.setRepeatMode(message.guild.id, !mode);
        return message.channel.send((!mode == true ? "🔁 | Enabled" : "🔀 | Disabled") + " Looping!");
    }
};
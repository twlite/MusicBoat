module.exports = {
    help: {
        name: "skip",
        aliases: []
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        if (!client.player.isPlaying(message.guild.id)) {
            return message.channel.send("❌ | I'm not playing anything?");
        }
        let song = await client.player.skip(message.guild.id);
        return message.channel.send(`✅ | Skipped **${song.name}**!`);
    }
};
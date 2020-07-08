module.exports = {
    help: {
        name: "volume",
        aliases: ["vol"]
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        if (!client.player.isPlaying(message.guild.id)) {
            return message.channel.send("❌ | I'm not playing anything?");
        }
        let volume = args[0];
        let queue = await client.player.getQueue(message.guild.id);
        if (!volume || isNaN(volume)) return message.channel.send(`🔊 | Current Volume: **${queue.volume}%**`);
        volume = Math.round(parseInt(volume));
        if (volume < 0 || volume > 150) return message.channel.send(`❌ | Volume must be more than or equal to 0 and less than or equal to 250!`);
        await client.player.setVolume(message.guild.id, volume);
        return message.channel.send(`✅ | Volume set to **${volume}%**`);
    }
};
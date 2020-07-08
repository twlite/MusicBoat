const { Util, MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "queue",
        aliases: ["q"]
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        if (!client.player.isPlaying(message.guild.id)) {
            return message.channel.send("❌ | I'm not playing anything?");
        }
        let queue = await client.player.getQueue(message.guild.id);
        let songs = queue.tracks.map((track, i) => {
            return `${i + 1} | **${track.name}** - **${track.author}**`;
        }).join('\n');
        let current = await client.player.nowPlaying(message.guild.id);
        current = `▶ | **${current.name}** - **${current.author}**\n`;
        current += songs;
        let chunks = client.Util.splitEmbedDescription(current, "\n");
        let total = chunks.length;
        let first = chunks.shift();
        const embed = new MessageEmbed()
            .setTitle("Queue")
            .setDescription(first)
            .setColor("#4D5E94")
            .setFooter(`Page 1/${total}`)
            .setTimestamp();
        message.channel.send(embed);
        chunks.forEach((c, i) => {
            const emb = new MessageEmbed()
                .setDescription(c)
                .setColor("#4D5E94")
                .setFooter(`Page ${i + 2}/${total}`)
                .setTimestamp();
            message.channel.send(emb);
        })
    }
};
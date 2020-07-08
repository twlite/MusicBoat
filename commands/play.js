const { Util } = require("discord.js");

module.exports = {
    help: {
        name: "play",
        aliases: ["p"]
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        let query = args.join(" ");
        if (!query) return message.channel.send("❌ | Please provide a search query!");
        let search = await client.player.searchTracks(query).catch(e => { 
            return message.channel.send(`❌ | No results were found!`);
         });
        if (search.length < 1) return message.channel.send(`❌ | No results were found!`);
        let track = search[0];
        if ((track.duration.split(":").length >= 3) && parseInt(track.duration.split(":")[0]) >= 3 && parseInt(track.duration.split(":")[2]) >= 1) return message.channel.send("❌ | Cannot play the songs that are longer than 3 hours.");
        if (client.player.isPlaying(message.guild.id)) {
            let playing = await client.player.addToQueue(message.guild.id, track, message.author);
            return message.channel.send(`🎵 | ${(!playing.description ? "Playlist **" + Util.escapeMarkdown(track.name) : "Song **" + Util.escapeMarkdown(track.name))}**  by **${Util.escapeMarkdown(track.author)}** - added to queue!`);
        } else {
            let playing = await client.player.play(message.member.voice.channel, track, message.author);
            return message.channel.send(`🎵 | Now playing: ${(!playing.description ? "Playlist **" + Util.escapeMarkdown(track.name) : "Song **" + Util.escapeMarkdown(track.name))}** by **${Util.escapeMarkdown(track.author)}**`);
        }
    }
};
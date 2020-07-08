const { MessageEmbed, Util } = require("discord.js");

module.exports = {
    help: {
        name: "nowplaying",
        aliases: ["np"]
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        if (!client.player.isPlaying(message.guild.id)) {
            return message.channel.send("❌ | I'm not playing anything?");
        }
        let current = await client.player.nowPlaying(message.guild.id);
        const embed = new MessageEmbed()
            .setTitle("🎶 Now Playing 🎶")
            .setColor("#4D5E94")
            .setDescription(`**${Util.escapeMarkdown(current.name)}** by **${current.author}**`)
            .setThumbnail(current.thumbnail)
            .setAuthor(current.requestedBy.tag, current.requestedBy.displayAvatarURL())
            .setFooter(`🔊 | ${client.player.createProgressBar(message.guild.id)} ${format(current.duration, false)}`);
        return message.channel.send(embed);
    }
};

function format(duration, ms) {
    if (!ms) {
        let chunk = duration.split(":");
        return chunk.map(m => {
            let time = parseInt(m);
            if (time >= 0 && time < 10) time = `0${time}`;
            return time
        }).join(":");
    } else {
        const round = duration > 0 ? Math.floor : Math.ceil;
        let obj = {
            hours: round(duration / 3600000) % 24,
            minutes: round(duration / 60000) % 60,
            seconds: round(duration / 1000) % 60
        };
        let formatted = "";
        if (obj.hours !== 0) {
            formatted = `${obj.hours}:${obj.minutes}:${obj.seconds}`
        } else formatted = `${obj.minutes !== 0 ? obj.minutes + ":" : ""}${obj.seconds}`;
        let chunk = formatted.split(":");
        return chunk.map(m => {
            let time = parseInt(m);
            if (time >= 0 && time < 10) time = `0${time}`;
        }).join(":");
    }
}
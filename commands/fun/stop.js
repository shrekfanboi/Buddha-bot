const Discord = require('discord.js');
module.exports = {
    name:'stop',
    description:'Stop the current song',
    async execute(message,args,queue){
        if(!message.member.voice.channel){
            message.channel.send(`You need to be in a voice channel,${message.author}`);
            return;
        }
        const serverQueue = queue.get(message.guild.id);
        if(!serverQueue){
            message.channel.send('No songs to stop');
            return;
        }
        if(!serverQueue.connection) return;
        serverQueue.playlist = [];
        serverQueue.connection.dispatcher.end();
        message.channel.send(`<:octagonal_sign:861237129833349150>`);
    }
}

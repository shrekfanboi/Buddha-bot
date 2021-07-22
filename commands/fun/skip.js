const Discord = require('discord.js');
module.exports = {
    name:'skip',
    description:'Skip the current song',
    async execute(message,args,queue){
        if(!message.member.voice.channel){
            message.channel.send(`You need to be in a voice channel,${message.author}`);
            return;
        }
        const serverQueue = queue.get(message.guild.id);
        if(!serverQueue){
            message.channel.send('No songs to skip');
            return;
        }
        if(!serverQueue.connection) return;
        message.channel.send(`<:ok_hand:861236517967495178>`);
        serverQueue.connection.dispatcher.end();
        console.log(`${serverQueue.playlist[0].title} skipped`);
    }
}

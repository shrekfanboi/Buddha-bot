const Discord = require('discord.js');
module.exports = {
	name: 'play',
	description: 'Play songs!',
    args:true,
	async execute(message, args,queue) {
        if(!message.member.voice.channel){
            message.channel.send(`You are not in a active voice channel,${message.author}`)
            return;
        }
        const ytdl = require('ytdl-core');
        song =  await require('./modules/search.js').YoutubeSearch(args,ytdl);
        if(!queue.get(message.guild.id)){
            const queueConstruct = {
                messageChannel:message.channel,
                playlist:[],
                connection:null,
            }
            queue.set(message.guild.id, queueConstruct);
            queueConstruct.playlist.push(song);
            try{
                const connection = await message.member.voice.channel.join();
                queueConstruct.connection = connection;
                require('./modules/stream.js').Play(queue,message.guild,ytdl);
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            queue.get(message.guild.id).playlist.push(song);
            songs =  queue.get(message.guild.id).playlist;
            console.log(`${song.title} has been added to playlist.`);
            queuedmessage = require('./modules/embed').CreateQueuedMessage(songs);
            message.channel.send(queuedmessage);
        }
        
    }
};

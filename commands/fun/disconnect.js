module.exports = {
	name: 'disconnect',
	description: 'Disconnect from voice channel',
	execute(message, args,queue) {
		const voiceChannel = message.member.voice.channel;
        if(!voiceChannel){
        message.channel.send('You need to be in the voice channel to disconnect');
        return;
        }
        if(!message.guild.voice)
        {
            message.channel.send(`Bot is not in any voice channel,${message.author}`);
        }
        else{
            message.guild.me.voice.channel.leave()
            message.channel.send(`Bot disconnected from ${message.guild.voice.channel.name}`);
            queue.clear();
        }
    }
};

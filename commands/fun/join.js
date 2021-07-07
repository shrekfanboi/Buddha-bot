module.exports = {
	name: 'join_voice',
	description: 'Join voice channel',
	execute(message, args) {
		const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.channel.send("You need to be in a voice channel to play music!");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.channel.send("I need the permissions to join and speak in your voice channel!");
	    }
        try{
            var connection = voiceChannel.join();
        }
        catch(err){
            console.log(err);
        }
    }
};
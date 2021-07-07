module.exports = {
	name: 'server-info',
	description: 'User Information',
	execute(message, args) {
		message.channel.send(`${message.guild.iconURL({format:'png',dynamic:true})}\nServer: ${message.guild.name}\nRegion: ${message.guild.region}`);
	},
};
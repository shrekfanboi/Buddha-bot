module.exports = {
	name: 'user-info',
	description: 'User Information',
	execute(message, args) {
		message.channel.send(`${message.author.displayAvatarURL({format: 'png', dynamic: true})}\nUser: ${message.author.username}\nID: ${message.author.id}`);
    },
};
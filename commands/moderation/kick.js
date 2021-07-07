module.exports = {
	name: 'kick',
	description: 'Kick Tagged User',
	args: true,
	guildOnly: true,
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}
		else{
			const tagged_user = message.mentions.users.first();
			message.channel.send(`You kicked ${tagged_user.username}`);
        }
    },
};
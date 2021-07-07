module.exports = {
	name: 'intro',
	description: 'Introduction',
	execute(message, args) {
		message.channel.send(`Hello ${message.author}!\nI am God and I am desgined by Mainak`);
	},
};
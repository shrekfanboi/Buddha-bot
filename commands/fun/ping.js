module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send('Loading..').then(async(msg) =>{
			msg.delete();
			message.channel.send(`Latency: ${msg.createdTimestamp - message.createdTimestamp}ms`);
			message.channel.send(`API Latency: ${Math.round(message.client.ws.ping)}ms`);
		});
	}
};

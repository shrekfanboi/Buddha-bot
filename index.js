const config = require('./config.json')
const fs = require('fs');
require('discord-reply');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const queue = new Map();


client.once('ready', () => {
	console.log('Bot is Ready To talk...');
});

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders){
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for(const file of commandFiles){
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}


client.on('message',message => {
	//console.log(message.client);
	if (message.author.bot) return;

	if(!message.content.startsWith(config.prefix)){
		require('./text-responses/reply.js').SendReply(message);
		return;
	}
	
	if(message.guild.voice){
		if(!message.guild.voice.connection){
			queue.clear();
			console.log("Queue Cleared");
		}
		else{
			console.log("Existing connections");
		}
	}

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	//console.log(commandName);

	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	if (command.args && !args.length) {
		if(command.usage){
			return message.channel.send(`Usage: ${command.usage}`);
		}
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
	
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	if (command.guildOnly && message.channel.type == 'dm'){
		return message.reply('I can\'t execute that command inside DMs!');
	}

	try {
		command.execute(message,args,queue);
		
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(process.env.TOKEN);

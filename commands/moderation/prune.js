module.exports = {
	name: 'prune',
	description: 'Delete server messages',
	args:true,
	usage: "!prune <Number between 2 and 10",
	execute(message, args) {
        const amount = parseInt(args[0]);
		if(isNaN(amount)){
			message.channel.send('This is not a valid number.');
		}
		else if(amount < 2 || amount > 10){
			message.channel.send("Number should be between 2 and 10");
		}
		else{
			message.channel.bulkDelete(amount);
		}
    
    
    
    },
};
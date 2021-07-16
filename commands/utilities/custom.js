module.exports = {
    name:'create',
    description:'Set custom replies to messages',
    args:true,
    execute(message,args){
        args = args.join(' ').split('~');
        if(args.length <= 1 && !args.includes('')) return;
        const custom_msg = args[0].trim().toLowerCase();
        const reply = args[1].trim();
        if(custom_msg.length > 50) return;
        console.log('Message: '+custom_msg+'\n'+' Reply: '+reply);
        require('./../database/insert').Insert([message.guild.name,custom_msg,reply,message.author.username])
        .then(() => message.reply("Message saved!"))
    }
}
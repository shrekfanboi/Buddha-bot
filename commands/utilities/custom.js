module.exports = {
    name:'create',
    description:'Set custom replies to messages',
    args:true,
    execute(message,args){
        args = args.join(' ').split('~');
        if(args.length <= 1) return;
        const custom_msg = args[0].trim();
        const reply = args[1].trim();
        console.log(custom_msg+' '+reply);
        require('./../../text-responses/record').Record(message.guild.id,custom_msg,reply);
        message.reply('Your messaage has been created!');
    }
}
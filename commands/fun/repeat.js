module.exports = {
    name:'repeat',
    description:'Make the bot say what you like',
    args:true,
    execute(message,args){
        message.channel.send(`"${args.join(' ')}"`);
    }
}

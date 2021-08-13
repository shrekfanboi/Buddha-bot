const { poll } = require('discord.js-poll');
module.exports = {
    name:'poll',
    description:'Start a poll',
    execute(message,args){
        console.log(args);
        if(args.length == 0 || (args.includes('~') && args.length < 3)) {
            message.channel.send('\nProper Usage: !poll Question ~ Option1 ~ Option2 ~ ...');
            return;
        }
        try{
            poll(message,args,'~','#00D1CD');
        }
        catch(err){
            console.log(err);
        }
       
    }
}
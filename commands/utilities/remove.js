module.exports = {
    name:'delete',
    description:'Remove custom message',
    args:true,
    execute(messaage,args){
        msg = args.join(' ').trim();
        msg = msg.toLowerCase();
        console.log(msg);
        require('./../../text-responses/record').Delete(messaage.guild.id,msg);
        messaage.reply('This message has been removed');
    }
}
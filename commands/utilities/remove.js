module.exports = {
    name:'delete',
    description:'Remove custom message',
    args:true,
    execute(messaage,args){
        msg = args.join(' ').trim();
        msg = msg.toLowerCase();
        console.log(msg);
        require('./../database/delete').Delete([messaage.guild.name,msg])
        .then(() => messaage.reply('Message Deleted!'));
    }
}
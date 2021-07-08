module.exports = {
    name:'img',
    args:true,
    cooldown:5,
    execute(message,args){
        require('./modules/images').GetRandomImage(message,args.join(' '));
    }
}

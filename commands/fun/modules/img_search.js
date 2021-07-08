module.exports = {
    name:'img_search',
    args:true,
    execute(message,args){
        require('./modules/images').GetRandomImage(message,args.join(' '));
    }
}
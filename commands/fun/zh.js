module.exports = {
    name:'chinese',
    description:'Translates to Chinese',
    args:true,
    execute(message,args){
        args = args.join(' ');
        require('./modules/translate').Translate(args,'zh',message);
    }
}
module.exports = {
    name:'italian',
    description:'Translates to italian',
    args:true,
    execute(message,args){
        args = args.join(' ');
        require('./modules/translate').Translate(args,'it',message);
    }
}
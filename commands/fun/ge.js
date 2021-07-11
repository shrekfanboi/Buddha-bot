module.exports = {
    name:'german',
    description:'Translates to German',
    args:true,
    execute(message,args){
        args = args.join(' ');
        require('./modules/translate').Translate(args,'de',message);
    }
}
module.exports = {
    name:'japanese',
    description:'Translates to Japanese',
    args:true,
    execute(message,args){
        args = args.join(' ');
        require('./modules/translate').Translate(args,'ja',message);
    }
}
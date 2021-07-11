module.exports = {
    name:'spanish',
    description:'Translates to Spanish',
    args:true,
    execute(message,args){
        args = args.join(' ');
        require('./modules/translate').Translate(args,'es',message);
    }
}
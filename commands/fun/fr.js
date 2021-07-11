module.exports = {
    name:'french',
    description:'Translates to French',
    args:true,
    execute(message,args){
        args = args.join(' ');
        require('./modules/translate').Translate(args,'fr',message);
    }
}
module.exports = {
    name:'movie',
    description:'Search for a movie',
    args:true,
    execute(message,args){
        console.log(args);
        var params = {}
        while(args.length){
            const el = args.shift();
            if(el.startsWith('-')){
                var param = el.substring(1);
                params[param] = '';
            }
            else{
                params[param] += params[param] === '' ? el : ' '+el;
            }
        }
        console.log(params);
        require('./modules/search').getMovieSearches(message,params);
    }
}
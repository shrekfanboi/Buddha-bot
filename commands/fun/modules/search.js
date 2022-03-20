module.exports ={
    type:'module',
    YoutubeSearch: async function(args,ytdl){
        try{
            const yts = require('yt-search');
            if(ytdl.validateURL(args[0])){
                var url = args[0];
            }
            else{
                const {videos} = await yts(args.slice(0).join(" "));
                if(videos.length){
                    var url = videos[0].url;
                }
                else{
                    console.log("No videos found with "+args[0]);
                    return;
                }
            }
            var songInfo = await ytdl.getInfo(url);
            return  {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                author:songInfo.videoDetails.ownerChannelName,
                duration:songInfo.videoDetails.lengthSeconds
            }
        }
        catch(err){
            console.log(err)
            return
        }
    },
    getMovieSearches: async function(message,params){
        const https = require('https');
        const API_KEY = '1c3ae435cb8ed5135049731eca912f67';
        const base_search_url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;
        const poster_base_url = "https://image.tmdb.org/t/p/original/"
        const base_discover_url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
        const genres = 
                {
                    "action":28,
                    "adventure":12,
                    "animation": 16,
                    
                    "comedy": 35,
                
                    "crime": 80,
            
                    "documentary": 99,
                

                    "drama": 18,
                
                
                    "family": 10751,
                  
                
                    "fantasy": 14,
           
                    "history": 36,
                    
                    "horror": 27,
                
                    "music": 10402,
                   
                    "mystery": 9648,
                
                    "romance": 10749,
                
                    "science fiction": 878,
                
            
                    "tv movie": 10770,
                
                
                    "thriller": 53,
                
                
                
                    "war": 10752,
        
                    "western": 37,
              
                }
        try{
        
        for(const [key,val] of Object.entries(params)){
            switch(key){
                case 'name':
                case 'n':
                    if(val === '' || val.match(/^[\d]+$/)){
                        return message.reply('This does not look like it could be the name of a movie \:face_with_monocle:')
                    }
                    break;
                case 'genre':
                case 'g':
                    if(val === ''){
                        message.channel.send('List of available genres:')
                        message.channel.send(Object.keys(genres).toString());
                    }
                    else if(!genres[val]){
                        return message.reply('Never heard of that genre \:thinking:');
                    }
                    break;
                case 'year':
                case 'y':
                    if(new Date(val).toString() === 'Invalid Date' || new Date(val) > new Date('2022')){
                        return message.reply('That year hasn\'t come \:rofl:');
                    }
                    break;
                case 'limit':
                case 'l':
                    if(isNaN(val) || parseInt(val)>10 || parseInt(val)<0){
                        return message.reply('Your limits are off the rails! \:fire:');
                    }
                    break;
                 
                case 'language':
                case 'lan':
                    const lan = await this.getLanguages(API_KEY,https,val);
                    console.log(lan)
                    if(!lan){
                        return message.reply("This langugae could not be found");
                    }
                    params[key] = lan['iso_639_1'];
                    break;
                case 'sort':
                case 's':
                    const options = ['popularity.asc','popularity.desc','release_date.asc','release_date.desc','vote_average.desc','vote_average.asc'];
                    if(val === ''){
                        message.channel.send('You can sort by')
                        return message.channel.send(options.join(','))
                    }
                    else if(!options.includes(val)){
                        return message.reply('Not a valid value')
                    }
                    break;
                case 'adult':
                case 'a':
                    if(parseInt(val) != 1 && parseInt(val) != 0){
                        return message.reply('This parameter only has binary choice - 1/0');
                    }
                    break;
                case 'help':
                case 'h':
                    message.channel.send('Glad you asked\n');
                    return message.channel.send(require('./embed').CreateMovieHelpEmbed());
                    
                default:
                    return message.reply(`Never heard of ${val}.Add -help for help`);
            }
        }
        const query = params['name'] || params['n'];
        if(query){
            const url = base_search_url+`&query=${query}`;
            var req = https.request(url,(res)=>{
                var data = '';
                res.on('data',(chunk)=>{
                    data += chunk;
                })
                res.on('end',()=>{
                    data = JSON.parse(data);
                    const payload = data['results'];

                    //filter results based on provided params
                    let results = payload.filter((e,index)=>{
                        let condition = e['title'].toLowerCase().includes(query.toLowerCase());
                        for(const property in params){
                            switch(property){
                                case 'genre':
                                case 'g':
                                    const genre = genres[params[property]];
                                    condition = condition && e['genre_ids'].includes(genre);
                                    break;
                                case 'year':
                                case 'y':
                                    const release = new Date(params[property]);
                                    const target = e['release_date'] !== '' ? new Date(e['release_date']) : e['relase_date']
                                    condition =  condition && target !== '' && release >=  target;
                                    break;
                                case 'limit':
                                case 'l':
                                    condition = condition && parseInt(params[property]) > index;
                                    break;
                                case 'adult':
                                case 'a':
                                    condition = parseInt(params[property]) ? condition && e['adult'] : condition && !e['adult'];
                                    break;
                            }
                        }
                        return condition;
                    })
                    
                    //finalize results
                    if(!results.length){
                        message.channel.send('Exact matches not found');
                    }
                    const cuttoff = (params['limit'] || params['l'])%5 || 5;
                    results = results.length ? results.slice(0,cuttoff) :payload.slice(0,cuttoff);
                    
                    //sort results if sort option given
                    if(params['sort']){
                        switch(params['sort']){
                            case 'popularity.asc':
                                results.sort((a,b)=>a['popularity'] - b['popularity']);
                                break;
                            case 'popularity.desc':
                                results.sort((a,b)=>b['popularity'] - a['popularity']);
                                break;
                            case 'release_date.asc':
                                results.sort((a,b)=> new Date(a['release_date']) - new Date(b['release_date']));
                                break;
                            case 'release_date.desc':
                                results.sort((a,b)=>new Date(b['release_date']) - new Date(a['release_date']));
                                break;
                            case 'vote_average.asc':
                                results.sort((a,b)=>a['vote_average'] - b['vote_average']);
                                break;
                            case 'vote_average.desc':
                                results.sort((a,b)=>b['vote_average'] - a['vote_average']);
                                break;
                        }
                    }
                    
                    //send the results to discord
                    console.log(results);
                    results.forEach(async(res)=>{
                        res['genre_ids'] =res['genre_ids'].map(el=>this.ToCamelCase(Object.keys(genres).find(key=>genres[key] === el)));
                        res['poster_path'] = (res['poster_path'] && res['poster_path'].length) ? poster_base_url+res['poster_path'] : res['poster_path'];

                        try{
                            await message.channel.send(require('./embed').CreateEmbeddedMovieSuggest(res));
                        }
                        catch(err){
                            console.log(err);
                        }
                    })
                })
            })
            req.on('error',(err)=>console.log(err));
            req.end();
        }
        else{
            //if name is not provided
            let url = base_discover_url;
            Object.entries(params).forEach(([param,val])=>{
                switch(param){
                    case 'genre':
                    case 'g':
                        url += `&with_genres=${genres[val]}`;
                        break;
                    case 'sort':
                    case 's':
                        url += `&sort_by=${val}`
                        break;
                    case 'year':
                    case 'y':
                        url += `&primary_release_year=${val}`;
                        break;
                    case 'adult':
                    case 'a':
                        url += val == 1 ?`&include_adult=true`:`&include_adult=false`;
                        break;
                    case 'language':
                    case 'lan':
                        url += `&language=${val}`;
                        break;
                    case 'limit':
                    case 'l':
                        break;
                    default:
                        message.reply(`Could not find ${val}`);
                }
            })
            console.log(url);
            var req = https.request(url,(res)=>{
                let data = '';
                res.on('data',(chunk)=>{
                    data += chunk;
                })
                res.on('end',()=>{
                    data = JSON.parse(data);
                    const payload = data['results'];
                    let results = payload.filter((e,index)=>{
                        if(params['limit'] || params['l']){
                            return index < params['limit'] || index < params['l'];
                        }
                        else{
                            return true;
                        }
                    })
                    const cuttoff = (params['limit'] || params['l'])%5 || 5;
                    results = results.length ? results.slice(0,cuttoff) : payload.slice(0,cuttoff);
                    results.forEach(async(res)=>{
                        try{
                            
                            res['genre_ids'] = res['genre_ids'].map(el=>this.ToCamelCase(Object.keys(genres).find(key=>genres[key] === el)));
                            res['poster_path'] = (res['poster_path'] && res['poster_path'].length) ? poster_base_url+res['poster_path'] : res['poster_path'];
                            console.log(res);
                            await message.channel.send(require('./embed').CreateEmbeddedMovieSuggest(res));
                        }
                        catch(err){
                            console.log(err);
                        }
                    })
                })
            })
            req.on('error',(err)=>console.log(err));
            req.end();
            return;
        }
    }
    catch(err){
        console.error(err);
    }
        
    },
    ToCamelCase:function(str){
        return str.replace(str.charAt(0),str.charAt(0).toUpperCase())
    },
    getLanguages:function(api_key,https,query){
        return new Promise((resolve,reject)=>{
            try{
                const url = `https://api.themoviedb.org/3/configuration/languages?api_key=${api_key}`
                var req = https.request(url,(res)=>{
                    let data = '';
                    res.on('data',(chunk)=>{
                        data += chunk;
                    })
                    res.on('end',()=>{
                        data = JSON.parse(data);
                        // console.log(data);
                        return resolve(data.find(lan=>lan['english_name'].toLowerCase() === query.toLowerCase()));
                    })
                })
                req.on('error',(e)=>reject(e));
                req.end();
            }
            catch(er){
                console.error(er);
                reject(er);
            }
        })
    }
}
        

    

module.exports = {
    name:'upload',
    description:'Uploads a song to the server',
    args:true,
    cooldown:10,
    async execute(message,args){
        const ytdl = require('ytdl-core');
        const path = require('path');
        const filepath = path.join(__dirname,'..','..','tmp');
        const song =  await require('./modules/search.js').YoutubeSearch(args,ytdl);
        console.log(song)
        if(song){
            require("./modules/download.js").DownloadYoutubeMp3(song,message,filepath);
        }
        else{
            message.reply('Not a valid link')
        }
        
    }
}
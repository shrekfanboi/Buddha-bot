module.exports = {
    name:'upload_song',
    description:'Uploads a song to the server',
    args:true,
    cooldown:10,
    async execute(message,args){
        const ytdl = require('ytdl-core');
        const path = require('path');
        const filepath = path.join(__dirname,'..','..','tmp');
        song =  await require('./modules/search.js').YoutubeSearch(args,ytdl);
        if(parseInt(song.duration) > 300) {
            message.reply(`This file is too large!`);
            return;
        }
        require("./modules/download.js").DownloadYoutubeMp3(song,message,filepath);
    }
}
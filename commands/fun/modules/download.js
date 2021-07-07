const { Message } = require("discord.js");

module.exports={
    type:"module",
    async DownloadYoutubeMp3(song,message,filepath){
        const ytdl = require("ytdl-core");
        const ffmpeg = require("fluent-ffmpeg");
        const fs = require('fs');
        // ffmpegLocation = ".\\ffmpeg";
        url = song.url;
        title = song.title.replace(/[^a-zA-Z0-9]/g,'_');
        filepath = `${filepath}\\${title}`
        try{
            stream = ytdl(url)
            var proc = new ffmpeg({source: stream});
            proc.setFfmpegPath("ffmpeg");
            proc.withAudioCodec('libmp3lame').toFormat('mp3')
                .saveToFile(`${filepath}.mp3`)
                .on('start',function(commandLine){ console.log('Process spawned '+commandLine+'\n')})
                .on('progress',function(progress){ 
                    console.log('Processing..');
                })
                .on('end',function(){ 
                    console.log('File Converted!');
                    output_file = filepath+'.mp3';
                    message.channel.send(`Here you go,${message.author}!`,{files:[output_file]})
                    .then(function() {
                        try{fs.unlinkSync(output_file);console.log('File Removed!')}
                        catch(err){console.log(err);}
                    });
                })
                .on('error',function(err){
                    console.log(err);
                    message.channel.send(`You can't get everything in life,${message.author}!`)
                });
        }
        catch(err){
            console.log(err);
        }
    }
};

const { Message } = require("discord.js");
const fs = require('fs');

module.exports={
    type:"module",
    DownloadYoutubeMp3:async function(song,message,filepath){
        const ytdl = require("ytdl-core");
        const url = song.url;
        const title = song.title.replace(/[^a-zA-Z0-9]/g,'_');
        filepath = `${filepath}\\${title}`
        try{
            const stream = ytdl(url,{filter:'audioonly'})
            stream.pipe(fs.createWriteStream(`${filepath}.mp3`))
            stream.on('finish',async()=>{
                console.log('finished')
                if(fs.existsSync(`${filepath}.mp3`)){
                    var file_size = fs.statSync(`${filepath}.mp3`).size / (1024*1024)
                    if(file_size < 8){
                        await message.channel.send(`Here you go,${message.author}!`,{files:[`${filepath}.mp3`]})
                        console.log('file removed')
                    }
                    else{
                        message.channel.send('File is too large')
                    }
                    fs.unlinkSync(`${filepath}.mp3`)
                }
            })
            stream.on('error',(err)=>console.log(err))
        }
        catch(err){
            console.log(err);
        }
    }
};

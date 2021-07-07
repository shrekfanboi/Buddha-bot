module.exports ={
    type:'module',
    YoutubeSearch: async function(args,ytdl){
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
        var song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            author:songInfo.videoDetails.ownerChannelName,
            duration:songInfo.videoDetails.lengthSeconds
        }
        return song;
    }
};
    
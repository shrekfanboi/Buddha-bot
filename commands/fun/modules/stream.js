const embed = require('./embed');

module.exports = {
    type:'module',
    Play:function (queue,guild,ytdl){
        serverQueue = queue.get(guild.id);
        if(!serverQueue.playlist.length){
            console.log('Finished Playing');
            queue.clear();
            return;
        }
        const dispatcher = serverQueue.connection.play(ytdl(serverQueue.playlist[0].url,{highWaterMark: 1<<25}),{type: 'opus'});
        dispatcher.on("finish", () => {
            serverQueue.playlist.shift();
            this.Play(queue,guild,ytdl);
        }).on("start", () => {
            const embed = require('./embed').CreateEmbeddedMessage(serverQueue.playlist);
            serverQueue.messageChannel.send(embed);
        })
        .on("error", error => console.error(error));
    }
}

const Discord = require('discord.js');
module.exports = {
    type:'module',
    CreateEmbeddedMessage:function(songs){
        const embed = new Discord.MessageEmbed()
            .setTitle('Now Playing')
            .setColor('#DAF7A6')
            .addFields(
            {name:songs[0].title,value:`${songs[0].author}\n${songs[0].url}`}
        )
        return embed;
    },
    CreateQueuedMessage: function(songs){
        const list = new Discord.MessageEmbed()
        .setTitle("Queued")
        .setColor('#0099ff')
        for(let i=1;i<songs.length;i++)
        {
            list.addField(`${i}.${songs[i].title}`,`${songs[i].author}`);
        }
        return list;
    }
}
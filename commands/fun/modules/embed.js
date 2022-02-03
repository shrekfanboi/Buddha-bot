const Discord = require('discord.js');
module.exports = {
    type:'module',
    CreateEmbeddedMessage:function(songs){
        return new Discord.MessageEmbed()
            .setTitle('Now Playing')
            .setColor('#DAF7A6')
            .addFields(
            {name:songs[0].title,value:`${songs[0].author}\n${songs[0].url}`}
        )
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
    },
    TranslatedMessage: function(query,translations){
        const list = new Discord.MessageEmbed()
        .setTitle(`Possible Translations`)
        .setColor('#000000')
        for(let i=0;i<translations.length;i++){
            if(translations[i] && !translations[i].includes(query)){
                list.addField(`${i+1}.${translations[i]}`,"\u200b");
            }
        }
        return list;
    },
    CreateEmbeddedMovieSuggest:function(res){
            return new Discord.MessageEmbed()
            .setTitle(res['title'])
            .setColor('0x0099ff')
            .addFields(
                {name:'Genres',value:res['genre_ids'].length ? res['genre_ids'].join(' '):'Not Found',inline:true},
                {name:'Lang',value:res['original_language'].length ? res['original_language']:'Not Found'},
                {name:'Release Date',value:res['release_date'].length ? res['release_date']:'Not Found',inline:true},
                {name:'Popularity',value:res['popularity'],inline:true},
                {name:'Votes',value:res['vote_average'],inline:true}
            
            )
            .setDescription(res['overview'])
            .setImage(res['poster_path'])
    },
    CreateMovieHelpEmbed:function(){
        return new Discord.MessageEmbed()
        .setTitle('~movie -[opt] [val] ..')
        .setDescription('Look up movies with the given parameters. The command only accepts the following options. Note that all of the options are not mandatory.')
        .addField('-name | -n [NAME]','Get movies with the given name')
        .addField('-genre | -g [GENRE]','Get movies with the given genre')
        .addField('-year | -y [YEAR]','Get movies released before or in the given year')
        .addField('-limit | -l [VALUE]','Limit search results to a maximum of given value (MAX 10)')
        .addField('-language | -lang [LANG]','Get movies of a given language')
        .addField('-adult | -a [1|0]','Get movies with or without the adult flag')
        .addField('-sort | -s [VALUE]','Sort movies based on the values provided.Values can be \npopularity.asc|popularity.desc|release_date.asc|release_date.desc|vote_average.asc|vote_average.desc')
        // .addField(
        //     {name:'\u200b',value:'popularity.asc = sort by popularity in ascending order'},
        //     {name:'\u200b',value:'popularity.desc = sort by popularity in descending order'},
        //     {name:'\u200b',value:'release_date.asc = sort by release date in ascending order'},
        //     {name:'\u200b',value:'release_date.desc = sort by release date in descending order'},
        //     {name:'\u200b',value:'vote_average.asc = sort by average votes in ascending order'},
        //     {name:'\u200b',value:'vote_average.desc = sort by average_votes in descending order'}
        // )
        .addField('-help | -h','Lists the usage and details of this command')
    }
}
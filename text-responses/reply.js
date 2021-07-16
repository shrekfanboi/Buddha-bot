module.exports = {
    async SendReply(message){
        const fs = require('fs');
        const readline = require('readline');
        const path = require('path');
        temp = message.content.toLowerCase();
        res = await require('./../commands/database/read').Read([message.guild.name,temp]);
        if(res){
            message.lineReply(res['reply']);
            return;
        }
        
        const file = readline.createInterface({
            input:fs.createReadStream(path.join(__dirname,'sad_words.txt')),
            output:process.stdout,
            terminal:false
        });
        //console.log(message.content)
        
        file.on('line',function(line) {
            if(temp.includes(line.toLowerCase())){
                require('./random').GetQuote(function(resp) {
                    message.lineReply(`${resp['q']}`);
                })
            }
        })
    }
}




module.exports = {
    SendReply(message){
        const fs = require('fs');
        const path = require('path');
        const readline = require('readline');
        const temp = message.content.toLowerCase();
        var obj = JSON.parse(fs.readFileSync(path.join(__dirname,"customMessage.json")));
        if(obj[message.guild.id]){
            if(obj[message.guild.id].hasOwnProperty(temp)){
                message.lineReply(obj[message.guild.id][temp]);
                return;
            }
        }
        const file = readline.createInterface({
            input:fs.createReadStream(path.join(__dirname,"sad_words.txt")),
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




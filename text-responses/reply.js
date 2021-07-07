module.exports = {
    SendReply(message){
        const fs = require('fs');
        const readline = require('readline');
        const file = readline.createInterface({
            input:fs.createReadStream("sad_words.txt"),
            output:process.stdout,
            terminal:false
        });
        //console.log(message.content)
        temp = message.content.toLowerCase();
        file.on('line',function(line) {
            if(temp.includes(line.toLowerCase())){
                require('./random').GetQuote(function(resp) {
                    message.lineReply(`${resp['q']}`);
                })
            }
        })
    }
}




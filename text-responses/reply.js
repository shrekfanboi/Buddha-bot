module.exports = {
    SendReply(message){
        const fs = require('fs');
        const path = require('path');
        const readline = require('readline');
        temp = message.content.toLowerCase();
        
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




module.exports = {
    type:"module",
    async GetRandomImage(message,query){
        const https = require('https');
        const fs = require('fs');
        const YOUR_ACCESS_KEY = "b2jDl2odWLNdlU7ebCteM80uTjnfIfQJsje2uvBseLM";
        const url = `https://api.unsplash.com/photos/random/?client_id=${YOUR_ACCESS_KEY}&query=${query}&count=1`;
       
        https.get(url,(resp) => {
            let data = '';
            
            resp.on('data', (chunk) => {
                    data += chunk;
            })
            resp.on('end', () => {
                try{
                    console.log(data);
                    data = JSON.parse(data)[0]['urls']['regular'];
                    message.channel.send(data);
                }
                catch(err){
                    console.log(err);
                    message.reply('No photos found');
                }
            })
        }).on("error", function(err){ 
            console.log(err);
            message.reply('Thats enough for the day');
        })
        
        
    }
}

module.exports = {
    type:'module',
    GetQuote(callback){
        const https = require('https');
        const url = "https://zenquotes.io/api/random";
        https.get(url,(resp) => {
            let data = '';
    
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                return callback(JSON.parse(data)[0]);
            });
            resp.on('error', (err) => {
                console.log(err)
            });
        });
    }
}



module.exports = {
    type:'module',
    Translate(query,lang,message){
        const http = require('https');
        const api_key = " e814fb41416741b9dc34";
        url = `https://api.mymemory.translated.net/get?q=${query}!&langpair=en|${lang}&de=hebeho6220@nhmty.com`

        var request = http.request(url, function (res) {
            var data = '';
            var translations = []
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                data = JSON.parse(data);
                translations.push(data['responseData']['translatedText']);
                translations.push(data['matches'][0]['translation']);
                translations.push(data['matches'][1]['translation']);
                translations.push(data['matches'][2]['translation'])
                message.reply(require('./embed').TranslatedMessage(query,translations));
            })
        })
        request.on('error', function (e) {
            console.log("Error!")
            console.log(e.message);
        });
        request.end();
    }
}


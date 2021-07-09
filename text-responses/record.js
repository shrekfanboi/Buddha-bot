module.exports = {
    type:'module',
    Record(guild,msg,reply){
        const fs = require('fs');
        const path = require('path');
        var obj = JSON.parse(fs.readFileSync(path.join(__dirname,'customMessage.json'),"utf-8"));
        if(!obj[guild]){
            obj[guild] = {};
        }
        msg = msg.toLowerCase();
        obj[guild][msg] = reply;
        var json = JSON.stringify(obj);
        fs.writeFileSync(__dirname+"\\customMessage.json",json,"utf-8");
    },
    Delete(guild,msg){
        const fs = require('fs');
        var obj = JSON.parse(fs.readFileSync(path.join(__dirname,'customMessage.json'),"utf-8"));
        if(!obj[guild][msg]){
            console.log('No items to delete');
            return;
        }
        delete obj[guild][msg];
        var json = JSON.stringify(obj);
        fs.writeFileSync(__dirname+"\\customMessage.json",json,"utf-8");
    }
}

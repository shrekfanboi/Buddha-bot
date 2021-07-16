const { Pool } = require("pg")
module.exports = {
    async Read(data){
        const path = require('path');
        pool = await require(path.join(__dirname,'conn.js')).Connect();
        query = "SELECT * FROM custom_messages WHERE server_name=$1 AND message=$2";
        res = await pool.query(query,data);
        return res.rows[0];
    }
}

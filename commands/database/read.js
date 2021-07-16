const { Pool } = require("pg")
module.exports = {
    async Read(data){
        pool = await require('./conn').Connect();
        query = "SELECT * FROM custom_messages WHERE server_name=$1 AND message=$2";
        res = await pool.query(query,data);
        return res.rows[0];
    }
}

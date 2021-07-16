const { Pool } = require("pg")
module.exports = {
    async Delete(data){
        pool = await require('./conn').Connect();
        (async () => {
            const client = await pool.connect();
            try{
                await client.query('BEGIN');
                var query = "SELECT * FROM custom_messages WHERE server_name = $1 AND message = $2";
                const res = await client.query(query,data);
                if(res.rows.length != 0){
                    console.log('Data exists-->')
                    var delete_query = "DELETE FROM custom_messages WHERE server_name = $1 AND message = $2 RETURNING *";
                    client.query(delete_query,data).then(res => console.log(res.rows));
                    await client.query('COMMIT');
                    console.log("Data Deleted");
                }
                else{
                    console.log('Data does not exists');
                }
            }
            catch(e){
                await client.query('ROLLBACK')
                throw e
            }
            finally{
                client.release();
            }
        })().catch(e => console.error(e.stack))
        pool.end();
    }
}
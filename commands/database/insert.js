const { Pool } = require("pg")
module.exports = {
    async Insert(data){
        pool = await require('./conn').Connect("mydb");
        (async() => {
            const client = await pool.connect()
            try{
                await client.query('BEGIN');
                var query = `SELECT * FROM custom_messages WHERE server_name = '${data[0]}' AND message = '${data[1]}'`;
                const res = await client.query(query);
                if(res.rows.length == 0){
                    var insert_query = "INSERT INTO custom_messages (server_name,message,reply,username) VALUES ($1,$2,$3,$4) RETURNING *";
                    client.query(insert_query,data).then(res => console.log(res.rows))
                    console.log('New Data entry');
                    await client.query('COMMIT');
                }
                else{
                    console.log('Found data-->')
                    console.log(res.rows);
                    if(res.rows[0]['reply'] != data[2]){
                        console.log("Updating Data")
                        var update_query = `UPDATE custom_messages SET REPLY ='${data[2]}', created_at =(to_timestamp(${Date.now()} / 1000.0)) WHERE server_name='${data[0]}' AND message='${data[1]}' RETURNING *`;
                        client.query(update_query).then(res => console.log(res.rows));
                        await client.query('COMMIT'); 
                    }
                    else{
                        console.log('Nothing to change!');
                    }
                }
                }
            catch(err){
                await client.query('ROLLBACK')
                throw e
            }
            finally{
                client.release();
            }
        })().catch(e => console.error(e.stack));
        pool.end();
    }
}
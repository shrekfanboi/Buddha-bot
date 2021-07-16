const { Pool } = require("pg")
module.exports = {
    async Connect(){
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
           ssl: {
            rejectUnauthorized: false
          }
        })
        return pool;
    }
}
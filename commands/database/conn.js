const { Pool } = require("pg")
const connectionString =  process.env.DATABASE_URL;
module.exports = {
    async Connect(){
        pool = new Pool({
           connectionString
        })
        return pool;
    }
}
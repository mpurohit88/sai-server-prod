// This will be in some JSON config we'll say
let dbOptions = '';
// const { env } = require("../lib/databaseMySQLNew");

dbOptions = {
   host: 'localhost',
   user: 'root',
   password: 'zgGcD5MmByFfkZlB',
   port: 3306,
   database: 'sheeranalyticsandinsights_sheer'
};

//This will depend on which version/module/db you're using, but here's what mine looks like
const MySQL = require("mysql");
// const config = require("../config/db.json");
let connectionPool = MySQL.createPool({ host: dbOptions.host, user: dbOptions.user, password: dbOptions.password, port: dbOptions.port, database: dbOptions.database });

const getConnection = async function (done) {
   try {
      connectionPool.getConnection(done);
   } catch (ex) {
      console.log("ex........", ex);
      throw ex;
   }
};

module.exports = { getConnection: getConnection };

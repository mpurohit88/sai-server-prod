const connection = require('../lib/connection.js');

const Log = function (params) {
  this.data = params.data;
};

Log.prototype.insert = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.query(`INSERT INTO logs(data) VALUES (?)`, [JSON.stringify(that.data)], (error, rows, fields) => {
          if (!error) {
            resolve(rows);
          } else {
            console.log('Error...', error);
            reject(error);
          }
        });
      } else {
        console.log('Error...', error);
        reject(error);
      }

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  }).catch(error => {
    throw error;
  });
};

module.exports = Log;

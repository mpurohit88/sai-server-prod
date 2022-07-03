const connection = require('../lib/connection.js');

const Solution = function (params) {
  this.id = params.industryCategoryId;
};

Solution.prototype.list = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.query('SELECT id, sector_name FROM solutions where status = 1', function (error, rows, fields) {

        if (!error) {
          resolve(rows);
        } else {
          console.log("Error...", error);
          reject(error);
        }

        connection.release();
        console.log('Process Complete %d', connection.threadId);
      });
    });
  });
}

module.exports = Solution;

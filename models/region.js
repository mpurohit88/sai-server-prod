const connection = require('../lib/connection.js');

const Region = function (params) {
  this.id = params.regionId;
};

Region.prototype.list = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.query('SELECT id, cat_name FROM region_cats where status = 1', function (error, rows, fields) {

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

Region.prototype.subRegionList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if (!error) {
        connection.query('select id, sector_name from reg_cat_sectors where reg_cat_id = "' + that.id + '" and status = 1', function (error, rows, fields) {
          if (!error) {
            resolve(rows);
          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
}

module.exports = Region;

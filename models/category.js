const connection = require('../lib/connection.js');

const Category = function (params) {
  this.id = params.industryCategoryId;
};

Category.prototype.addSubCategory = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.query(`INSERT INTO category(category, type, related_to, created_by) VALUES (?,?,?,?)`, [that.subcategory, 3, that.category, that.user_id], (error, rows, fields) => {
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

Category.prototype.list = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.query('select id, cat_name from industry_cats where status = 1', function (error, rows, fields) {

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

Category.prototype.subCategoryList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if (!error) {
        connection.query('select id, sector_name from ind_cat_sectors where ind_cat_id = "' + that.id + '" and status = 1', function (error, rows, fields) {
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

module.exports = Category;

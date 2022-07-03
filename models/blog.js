const connection = require('../lib/connection.js');

const Blog = function (params) {
  this.id = params.id;
  this.status = 1;
};


Blog.prototype.updateView = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {

        connection.query(`select views from blogs WHERE id = ?`, [that.id], (error, rows, fields) => {

          const values = [parseInt(rows[0].views) + 1, that.id];
          connection.query(`UPDATE blogs SET views = ? WHERE id = ?`, values, (error, rows, fields) => {
            if (!error) {
              resolve(rows);
            } else {
              console.log('Error...', error);
              reject(error);
            }
          });
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

module.exports = Blog;

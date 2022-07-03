const connection = require('../lib/connection.js');

const Press = function (params) {
  this.id = params.id;
  this.title = params.title;
  this.meta_title = params.metaTitle;
  this.meta_desc = params.metaDescription;
  this.meta_keywords = params.metaKeywords;
  this.ind_cat_id = params.industryCategory;
  this.ind_sect_id = params.industrySubCategory;
  this.body = params.body;
  this.quote = params.quote;
  this.name = params.name;
  this.slug = params.slug;
  this.link = params.link;
  this.views = params.views || 0;
  this.status = 1;
  this.created_at = new Date();
};

Press.prototype.insert = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      let values = [
        [that.title, that.meta_title, that.meta_desc, that.meta_keywords, that.ind_cat_id, that.ind_sect_id,
        that.body, that.quote, that.name, that.slug, that.link, that.views, that.status, that.created_at]
      ];

      if (!error) {
        connection.query(`INSERT INTO presses(title, meta_title, meta_desc, meta_keywords, ind_cat_id, ind_sect_id, body, quote, name, slug, link, views, status, created_at) VALUES ?`, [values], (error, rows, fields) => {
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


Press.prototype.updateView = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {

        connection.query(`select views from presses WHERE id = ?`, [that.id], (error, rows, fields) => {

          const values = [parseInt(rows[0].views) + 1, that.id];
          connection.query(`UPDATE presses SET views = ? WHERE id = ?`, values, (error, rows, fields) => {
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

Press.prototype.selectAll = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.query(`SELECT * FROM presses where status = 1 order by created_at desc limit 50`, [], (error, rows, fields) => {
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
    });
  })
}

Press.prototype.update = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      let query = `UPDATE presses set `;
      let values = [];

      if (that.title) {
        query += 'title = ? ,';
        values.push(that.title);
      }

      if (that.meta_desc) {
        query += 'meta_desc = ? ,';
        values.push(that.meta_desc);
      }

      if (that.body) {
        query += 'body = ? ,';
        values.push(that.body);
      }

      if (that.meta_title) {
        query += 'meta_title = ? ,';
        values.push(that.meta_title);
      }

      if (that.quote) {
        query += 'quote = ? ,';
        values.push(that.quote);
      }

      query += 'updated_at = ? ';
      values.push(new Date());

      query += 'where id = ? ';
      values.push(that.id);

      if (!error) {
        connection.query(query, values, (error, rows, fields) => {
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

module.exports = Press;

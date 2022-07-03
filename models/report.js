const connection = require('../lib/connection.js');

const Report = function (params) {
  this.id = params.id;
  this.meta_keywords = params.metaKeywords;
  this.format = params.format;
  this.ind_cat_id = params.industryCategory;
  this.ind_sect_id = params.industrySubCategory;
  this.meta_desc = params.metaDescription;
  this.meta_title = params.metaTitle;
  this.multiple_user_price = params.multipleUserPrice;
  this.pages = params.pages;
  this.month = params.publishedDate;
  this.reg_cat_id = params.regionalCategory;
  this.reg_sect_id = params.regionalSector;
  this.analysis = params.reportAnalysis;
  this.description = params.reportDescription;
  this.report_type = params.reportType;
  this.report_sub_type = 1;
  this.single_user_price = params.singleUserPrice;
  this.slug = params.slug;
  this.table_contents = params.tableOfContent;
  this.title = params.title;
  this.discount = params.discount;
  this.report_id = params.reportId;
  this.limit = params.limit;
  this.month = params.month;
};

Report.prototype.insert = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      let values = [
        [that.meta_title, that.meta_desc, that.meta_keywords, that.report_type, that.ind_cat_id, that.ind_sect_id,
        that.reg_cat_id, that.reg_sect_id, that.title, that.report_sub_type, that.description, that.table_contents, that.analysis,
        that.slug, that.single_user_price, that.multiple_user_price, that.discount, that.month, that.pages, that.format, that.report_id, 1, new Date()]
      ];

      if (!error) {
        connection.query(`INSERT INTO syn_lpr_reports(meta_title, meta_desc, meta_keywords, report_type, ind_cat_id, ind_sect_id, reg_cat_id, reg_sect_id, 
          title, report_sub_type, description, table_contents, analysis, slug, single_user_price, multiple_user_price, discount, month, pages, format, 
          report_id, status, created_at) VALUES ?`, [values], (error, rows, fields) => {
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

Report.prototype.update = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      let query = `UPDATE syn_lpr_reports set `;
      let values = [];

      if (that.title) {
        query += 'title = ? ,';
        values.push(that.title);
      }

      if (that.meta_desc) {
        query += 'meta_desc = ? ,';
        values.push(that.meta_desc);
      }

      if (that.description) {
        query += 'description = ? ,';
        values.push(that.description);
      }
      if (that.table_contents) {
        query += 'table_contents = ? ,';
        values.push(that.table_contents);
      }

      if (that.analysis) {
        query += 'analysis = ? ,';
        values.push(that.analysis);
      }

      if(that.month) {
       query += 'month = ? ,';
       values.push(that.month);
     }
console.log("meta title...", that.meta_title);
     if(that.meta_title){
	query += 'meta_title = ? ,';
	values.push(that.meta_title);
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

Report.prototype.selectAll = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        let query = `SELECT * FROM syn_lpr_reports where status = 1 order by created_at desc`;

        if (this.limit === "All") {
          query = query + " limit 300,1000";
        } else {
          query = query + " limit " + Number(this.limit) + ",100";
        }

        connection.query(query, [], (error, rows, fields) => {
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

module.exports = Report;

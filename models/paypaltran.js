const connection = require("../lib/connection.js");

const PayPalTran = function(params) {
  this.payerID = params.payerID;
  this.orderID = params.orderID;
  this.tranStatus = params.tranStatus;
  this.name = params.name;
  this.email = params.email;
  this.mobile = params.mobile;
};

PayPalTran.prototype.save = function() {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.query(
          `INSERT INTO PayPal_Transaction(order_id, payer_id, tran_status,name,email,mobile) VALUES (?,?,?)`,
          [
            that.orderID,
            that.payerID,
            that.tranStatus,
            that.name,
            that.email,
            that.mobile
          ],
          (error, rows, fields) => {
            if (!error) {
              resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          }
        );
      } else {
        console.log("Error...", error);
        reject(error);
      }

      connection.release();
      console.log("Process Complete %d", connection.threadId);
    });
  }).catch(error => {
    throw error;
  });
};

module.exports = PayPalTran;

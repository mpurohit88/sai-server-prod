const PayPalTran = require("../models/paypaltran");

const save = async function(req, res, next) {
  const payPalTranObj = {
    payerID: req.body.payerID,
    orderID: req.body.orderID,
    tranStatus: req.body.tranStatus,
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile
  };

  try {
    const newPayPalTran = new PayPalTran(payPalTranObj);

    await newPayPalTran.save();

    res.send({ newPayPalTran });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  save
};

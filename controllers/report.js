const Report = require('../models/report.js');

const add = async function (data) {

  try {
    const newReport = new Report(data);

    return newReport.insert();
  } catch (err) {
    throw err;
  }
};

const fetchAll = async function (data) {

  try {
    const newReport = new Report(data);

    return newReport.selectAll();
  } catch (err) {
    throw err;
  }
};

const update = async function (data) {

  try {
    const report = new Report(data);

    return report.update();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  add,
  fetchAll,
  update
};
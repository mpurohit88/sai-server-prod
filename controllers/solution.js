const Solution = require('../models/solution.js');

const solutionList = async function (req, res, next) {
  try {
    return await new Solution({}).list();
  } catch (err) {
    next(err);
  }
};


module.exports = {
  solutionList
};
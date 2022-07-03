const Region = require('../models/region.js');

const regionList = async function (req, res, next) {
  try {
    return await new Region({}).list();
  } catch (err) {
    next(err);
  }
};

const subRegionList = async function (id) {
  try {
    return await new Region({ regionId: id }).subRegionList();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  regionList,
  subRegionList
};
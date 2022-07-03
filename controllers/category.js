const Category = require('../models/category.js');

const add = async function (req, res, next) {
  const categoryParam = {
    maincategory: req.body.maincategory,
    category: req.body.category,
    subcategory: req.body.subcategory,
    user_id: req.decoded.id,
  };

  try {
    const newCategory = new Category(categoryParam);

    await newCategory.add();
    const categoryList = await new Category({ getAll: 1 }).mainCategoryList();

    res.send({ categoryList });
  } catch (err) {
    next(err);
  }
};

const categoryList = async function (req, res, next) {
  try {
    return await new Category({}).list();
  } catch (err) {
    next(err);
  }
};

const subCategoryList = async function (id) {
  try {
    return await new Category({ industryCategoryId: id }).subCategoryList();
  } catch (err) {
    next(err);
  }
};


module.exports = {
  add,
  categoryList,
  subCategoryList
};
const Blog = require('../models/blog.js');

const updateView = async function (data) {
  try {
    let id = data.id;  // mysql__Presses__26
    if (data.id.indexOf('mysql__Presses__') >= 0) {
      id = data.id.replace('mysql__Presses__', '');
    }

    const newBlog = new Blog({ id: id, views: data.views });

    return newBlog.updateView();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateView
};
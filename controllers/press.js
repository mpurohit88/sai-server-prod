const Press = require('../models/press.js');

const add = async function (data) {

  try {
    const newPress = new Press(data);

    return newPress.insert();
  } catch (err) {
    next(err);
  }
};

const updateView = async function (data) {
  try {
    let id = data.id;  // mysql__Presses__26
    if (data.id.indexOf('mysql__Presses__') >= 0) {
      id = data.id.replace('mysql__Presses__', '');
    }

    const newPress = new Press({ id: id, views: data.views });

    return newPress.updateView();
  } catch (err) {
    next(err);
  }
};

const fetchAll = async function (data) {
  try {
    const press = new Press(data);

    return press.selectAll();
  } catch (err) {
    throw err;
  }
};

const update = async function (data) {

  try {
    const press = new Press(data);

    return press.update();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  add,
  updateView,
  fetchAll,
  update
};
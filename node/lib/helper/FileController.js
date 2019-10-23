const fs = require('fs');
const _ = require('lodash/lang');

const STORE_DIRECTORY = 'store/';

module.exports = {
  saveObject,
}

// EXPORTS

/**
 * Saves a JSON object to a file name in the store directory
 * @param name file name
 * @param object JSON valid plain data object
 */
function saveObject(name, object) {
  return new Promise((resolve, reject) => {
    if (!object || !_.isPlainObject(object)) {
      return reject('invalid data object provided to save');
    }

    if (!name || !_.isString(name)) {
      return reject('invalid file name string provided to save');
    }

    fs.writeFile(STORE_DIRECTORY + name, JSON.stringify(object), 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}

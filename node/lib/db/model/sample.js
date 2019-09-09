module.exports = {
  create: create,
  getAll: getAll
};

/**
 * Creates a single sample schema object
 * @param name the name string entry
 * @param description the description string entry
 * @param age the age intege entry
 * @return promise to execute
 */
function create(name, description, age) {
  return Promise.reject('create stub');
}

/**
 * Fetches all entries in the model
 * @return promise to fetch array of sample schema objects
 */
function getAll() {
  return Promise.reject('get all stub');
}

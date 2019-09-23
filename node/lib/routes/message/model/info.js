module.exports = {
  from: from,
  validate: validate
};

function from(message) {
  throw new Error('MessageInfo model not implemented as an output');
}

function validate(req, res, next) {
  throw new Error('MessageInfo model not implemented as an input');
}

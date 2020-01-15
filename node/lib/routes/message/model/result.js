module.exports = {
  from: from,
  validate: validate
};

function from(requestId) {
  return {
    "id": requestId
  };
}

function validate(req, res, next) {
  throw new Error('MessageResult model not implemented as an input');
}

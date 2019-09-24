const EmailValidator = require('email-validator');

const isString = require('lodash/isString');

module.exports = {
  from: from,
  validate: validate
};

function from(message) {
  throw new Error('MessageInfo model not implemented as an output');
}

function validate(req, res, next) {
  // from email
  const from = req.body.from;
  if (!isString(from) || !EmailValidator.validate(from)) {
    return next(new HttpError(400,
                      'from parameter is required and must be a valid email'));
  }

  // to email
  const to = req.body.to;
  if (!isString(to) || !EmailValidator.validate(to)) {
    return next(new HttpError(400,
                      'to parameter is required and must be a valid email'));
  }

  // content
  const content = req.body.content;
  if (!content || !isString(content)) {
    return next(new HttpError(400,
                      'content parameter is required and must be a valid string'));
  }

  return next();
}

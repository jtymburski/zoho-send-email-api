const uuidv4 = require('uuid/v4');

const ModelInfo = require('./model/info');

module.exports = (app) => {
  if (!app) throw new Error('Missing parameter: \'app\' not provided');

  const express = require('express');
  const controller = express.Router();

  controller.route('/')
    // send a message
    .post(ModelInfo.validate, send);

  return controller;
};

/**
 * Sends an HTML email message
 * @in MessageInfo packet model
 */
function send(req, res, next) {

  const requestId = uuidv4();
  FileController.saveObject(requestId, req.body)
    .then(() => Promise.reject('todo - add uuid to cache queue'))
    .catch(err => HttpHelper.processError(err, next));
}

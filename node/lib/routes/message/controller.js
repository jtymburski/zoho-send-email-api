const uuidv4 = require('uuid/v4');

const ModelInfo = require('./model/info');
const ModelResult = require('./model/result');
let QueueController = null;

module.exports = (app) => {
  if (!app) throw new Error('Missing parameter: \'app\' not provided');

  const express = require('express');
  const controller = express.Router();

  QueueController = require(`${__root}/queue/controller`)(app);

  controller.route('/')
    // send a message
    .post(ModelInfo.validate, send);

  return controller;
};

// EXPORTS

/**
 * Sends an HTML email message
 * @in MessageInfo packet model
 */
function send(req, res, next) {
  const requestId = uuidv4();

  FileController.saveObject(requestId, req.body)
    .then(() => QueueController.addRequest(requestId))
    .then(() => HttpHelper.success(req, res, 202, ModelResult.from(requestId)))
    .catch(err => HttpHelper.processError(err, next));
}

const ModelInfo = require('./model/info');

module.exports = (app) => {
  if (!app) throw new Error('Missing parameter: \'app\' not provided');

  const express = require('express');
  const controller = express.Router();

  controller.route('/')
    // send a message
    .post(app.auth, ModelInfo.validate, send);

  return controller;
};

/**
 * Sends an HTML email message
 * @in MessageInfo packet model
 */
function send(req, res, next) {
  throw new Error('Message send POST functionality not implemented');
}

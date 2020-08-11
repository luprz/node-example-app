'use strict'
var MessagesService = require('../services/messages/MessagesService')

class IndexController {
  // GET /
  static index(req, res, next) {
    let message = MessagesService.call('index', 0, 'Luis Perez')
    res.json(message);
  }

  // GET /show/:id
  static show(req, res, next) {
    let id = req.params.id;
    res.json(MessagesService.call('show', id, 'Luis Perez'));
  }
}

module.exports = IndexController;

'use strict'
var models = require('../models')

class UsersController {
  // GET /
  static async index(req, res, next) {
    const users = await models.User.findAll({ order: [['id', 'DESC']] });
    res.json(users);
  }

  // GET /:id
  static async show(req, res, next) {
    await models.User.findByPk(req.params.id)
      .then(user => {
        (user !== null)
          ? res.json(user)
          : res.status(404).json({ no_found: `User with id=${req.params.id} not found` })
      })
  }

  // POST /
  static async create(req, res, next) {
    const user = await models.User.build(userParams(req.body));

    user.save()
      .then(user => {
        res.json(user)
      })
      .catch(error => {
        res.status(400).json(error.errors)
      })
  }

  // PUT /:id
  static async update(req, res, next) {
    await models.User.findByPk(req.params.id)
      .then(user => {
        if (user !== null) {
          user.update(userParams(req.body)).then(response => {
            res.json(response)
          })
          .catch(error => {
            res.status(400).json(error.errors)
          })
        } else {
          res.status(404).json({ no_found: `User with id=${req.params.id} not found` })
        }
      })
  }

  // DELETE /:id
  static async destroy(req, res, next)  {
    await models.User.findByPk(req.params.id)
      .then(user => {
        if (user !== null) {
          user.destroy();
          res.json(true);
        } else {
          res.status(404).json({ no_found: `User with id=${req.params.id} not found` })
        }
      })
  }
}

const userParams = (params) => {
  return {
    name: params.user.name,
    email: params.user.email,
    bio: params.user.bio
  }
}

module.exports = UsersController;

'use strict'
var models = require('../models')

class UsersController {
  // GET /
  static async index(req, res, next) {
    const users = await models.User.findAll({include: [ 'books' ], order: [['id', 'DESC']]
    });
    res.json(users);
  }

  // GET /:id
  static async show(req, res, next) {
    await models.User.findByPk(req.params.id, { include: [ 'books' ] })
      .then(user => {
        (user !== null)
          ? res.json(user)
          : res.status(404).json(notFound(req.params.id))
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
          res.status(404).json(notFound(req.params.id))
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
          res.status(404).json(notFound(req.params.id))
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

const notFound = (id) => {
  return { not_found: `User with id=${id} not found` }
}

module.exports = UsersController;

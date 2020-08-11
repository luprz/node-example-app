var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/UsersController')

/* GET home page. */
router.get('/', UsersController.index);
router.post('/', UsersController.create);
router.get('/:id', UsersController.show);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.destroy);

module.exports = router;

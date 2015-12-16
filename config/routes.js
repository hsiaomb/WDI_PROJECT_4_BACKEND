var express  = require('express');
var router   = express.Router();
var passport = require("passport");

var usersController = require('../controllers/usersController');
var channelsController = require('../controllers/channelsController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.usersShow)
  .put(usersController.usersUpdate)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete);

router.route('/channels')
  .get(channelsController.channelsIndex)
  .post(channelsController.createChannel);

router.route('/channels/:id')
  .get(channelsController.channelsShow)
  .put(channelsController.channelsUpdate)
  .patch(channelsController.channelsUpdate)
  .delete(channelsController.channelsDelete);

module.exports = router;

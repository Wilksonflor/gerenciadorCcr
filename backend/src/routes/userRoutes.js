const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUser);
router.post('/user', userController.createUser);
router.get('/user/:nome', userController.getOneUser);
router.post('/authenticate', userController.authenticateUser)

module.exports = router;

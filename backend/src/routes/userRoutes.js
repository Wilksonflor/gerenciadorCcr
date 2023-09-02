    const express = require('express');
    const userController = require('../controllers/userController');
   
    const router = express.Router();

    router.get('/', userController.getAllUser);
    // router.post('/user', userController.registerUser);
    router.get('/user/:nome', userController.getOneUser);
   
    router.post('/auth/register', userController.registerUser);
    router.post('/authenticate', userController.authenticateUser)



    module.exports = router;

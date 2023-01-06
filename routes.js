// importing controllers
const indexController = require('./controller/indexController');
const userController = require('./controller/userController');



const express = require('express');
const router = express.Router();

router.get('/', index);

router.get('/sign-up', signUp);
router.post('/sign-up', signUp);

router.get('/login', login);
router.post('/login', login, confirmLogin);

router.get('/logout', logOut);

router.get('/confirm-password', confirmPassword);
router.post('/confirm-password', confirmPassword);

router.get('/change-password', changePassword);
router.post('/change-password', changePassword);






module.exports = router;




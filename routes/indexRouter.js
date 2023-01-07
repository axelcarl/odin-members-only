const express = require("express");
const userController = require('../controllers/userController');
const router = express.Router();


router.get('/', userController.get);

router.get('/sign-up', userController.signupForm);

router.post('/sign-up', userController.signup);

router.get('/log-in', userController.loginForm);

router.get('/log-out', userController.logout);

router.post('/log-in', userController.login);

router.get('/member', userController.member);

module.exports = router;
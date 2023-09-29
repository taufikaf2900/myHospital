const express = require('express');
const HomeController = require( '../controllers/home' );
const hospitalRoute = require('./hospital');
const registerRoute = require('./register');
const loginRoute = require('./login');
const LogoutController = require( '../controllers/logout' );
const userAuthentication = require('../middlewares/userAuthentication');

const router = express.Router();

router.get('/', HomeController.showHomePage);
router.get('/logout', LogoutController.logout);
router.use('/register', registerRoute);
router.use('/login', loginRoute);
router.use('/hospital', userAuthentication, hospitalRoute);
router.all('*', HomeController.notFoundPage);

module.exports = router;
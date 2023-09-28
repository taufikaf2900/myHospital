const express = require('express');
const Controller = require('../controllers/home');
const hospitalRoute = require('./hospital');
const registerRoute = require('./register');
const loginRoute = require('./login');
const LogoutController = require( '../controllers/logout' );
const userAuthentication = require('../middlewares/userAuthentication');

const router = express.Router();

router.get('/', Controller.showHomePage);
router.get('/logout', LogoutController.logout);
router.use('/register', registerRoute);
router.use('/login', loginRoute);
router.use(userAuthentication);
router.use('/hospital', hospitalRoute);

module.exports = router;
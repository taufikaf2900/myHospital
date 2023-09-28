const express = require('express');
const Controller = require('../controllers/controller_taufik');
const hospitalRoute = require('./hospital_taufik');
const registerRoute = require('./register_taufik');
const loginRoute = require('./login_taufik');
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
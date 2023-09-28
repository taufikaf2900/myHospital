const express = require('express');
const Controller = require( '../controllers/controller_taufik' );
const hospitalRoute = require('./hospital_taufik');
const registerRoute = require('./register_taufik');

const router = express.Router();

router.get('/', Controller.showHomePage);
router.use('/register', registerRoute);
router.use('/hospital', hospitalRoute);

module.exports = router;
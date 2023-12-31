const express = require('express');
const LoginController = require('../controllers/login');

const router = express.Router();

router.get('/', LoginController.showLoginForm);
router.post('/', LoginController.login);

module.exports = router;
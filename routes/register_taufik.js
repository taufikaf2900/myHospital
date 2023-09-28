const express = require('express');
const RegisterController = require('../controllers/register_taufik');

const router = express.Router();

router.get('/', RegisterController.showRegisterForm);
router.post('/', RegisterController.createUser);

module.exports = router;
const express = require('express');
const Controller = require( '../controllers/controller_taufik' );

const router = express.Router();

router.get('/', Controller.showHomePage);
router.get('/homepage/:userId', Controller.findAllPatient);
router.get('/homepage/:userId/add', Controller.showAddPatientForm);
router.post('/homepage/:userId/add', Controller.createPatient);
router.get('/homepage/:userId/patient/:patientId/recovered', Controller.makePatientRecover);

module.exports = router;
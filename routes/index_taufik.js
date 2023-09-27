const express = require('express');
const Controller = require( '../controllers/controller_taufik' );

const router = express.Router();

router.get('/', Controller.showHomePage);
router.get('/homepage/:userId/patient', Controller.findAllPatient);
router.get('/homepage/:userId/patient/add', Controller.showAddPatientForm);
router.post('/homepage/:userId/patient/add', Controller.createPatient);
router.get('/homepage/:userId/patient/:patientId/delete', Controller.destroyPatient);

module.exports = router;
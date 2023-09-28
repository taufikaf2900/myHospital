const express = require('express');
const Controller = require( '../controllers/controller_taufik' );

const router = express.Router();

router.get('/', Controller.showHomePage);
router.get('/hospital/:userId/patient', Controller.findAllPatient);
router.get('/hospital/:userId/patient/add', Controller.showAddPatientForm);
router.post('/hospital/:userId/patient/add', Controller.createPatient);
router.get('/hospital/:userId/patient/:patientId', Controller.showDetailPatient);
router.get('/hospital/:userId/patient/:patientId/delete', Controller.destroyPatient);

module.exports = router;
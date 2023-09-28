const express = require('express');
const Controller = require( '../controllers/controller_taufik' );

const router = express.Router();

router.get('/', Controller.showHomePage);
router.get('/hospital/patient', Controller.findAllPatient);
router.get('/hospital/patient/add', Controller.showAddPatientForm);
router.post('/hospital/patient/add', Controller.createPatient);
router.get('/hospital/patient/:patientId', Controller.showDetailPatient);
router.get('/hospital/patient/:patientId/edit', Controller.showEditPatientForm);
router.post('/hospital/patient/:patientId/edit', Controller.updatePatient);
router.get('/hospital/patient/:patientId/delete', Controller.destroyPatient);

module.exports = router;
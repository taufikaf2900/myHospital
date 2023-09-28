const express = require('express');
const Controller = require( '../controllers/controller_taufik' );

const router = express.Router();

router.get('/', Controller.showHomePage);
router.get('/hospital/patient', Controller.findAllPatient);
router.get('/hospital/statistic', Controller.findAllStatistic);
router.get('/hospital/patient/add', Controller.showAddPatientForm);
router.post('/hospital/patient/add', Controller.createPatient);
router.get('/hospital/patient/:patientId', Controller.showDetailPatient);
router.get('/hospital/patient/:patientId/edit', Controller.showEditPatientForm);
router.post('/hospital/patient/:patientId/edit', Controller.updatePatient);
router.get('/hospital/patient/:patientId/delete', Controller.destroyPatient);
router.get('/hospital/patient/:patientId/addDesease', Controller.showAddPatientDeseaseForm);
router.post('/hospital/patient/:patientId/addDesease', Controller.createPatientDesease);
router.get('/hospital/patient/:patientId/medicalRecord', Controller.findMedicalRecord);
router.get('/hospital/patient/:patientId/medicalRecord/add', Controller.showAddMedicalRecordForm);
router.post('/hospital/patient/:patientId/medicalRecord/add', Controller.createMedicalRecord);

module.exports = router;
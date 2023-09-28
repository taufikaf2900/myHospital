const express = require('express');
const HospitalController = require( '../controllers/hospital' );

const router = express.Router();

router.get('/', HospitalController.redirectToHospitalMainPage);
router.get('/patient', HospitalController.findAllPatient);
router.get('/statistic', HospitalController.findAllStatistic);
router.get('/patient/add', HospitalController.showAddPatientForm);
router.post('/patient/add', HospitalController.createPatient);
router.get('/patient/:patientId', HospitalController.showDetailPatient);
router.get('/patient/:patientId/edit', HospitalController.showEditPatientForm);
router.post('/patient/:patientId/edit', HospitalController.updatePatient);
router.get('/patient/:patientId/delete', HospitalController.destroyPatient);
router.get('/patient/:patientId/addDesease', HospitalController.showAddPatientDeseaseForm);
router.post('/patient/:patientId/addDesease', HospitalController.createPatientDesease);
router.get('/patient/:patientId/medicalRecord', HospitalController.findMedicalRecord);
router.get('/patient/:patientId/medicalRecord/add', HospitalController.showAddMedicalRecordForm);
router.post('/patient/:patientId/medicalRecord/add', HospitalController.createMedicalRecord);

module.exports = router;
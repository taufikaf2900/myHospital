const express = require('express');
const HospitalController = require('../controllers/hospital');
const roleManipulateAccess = require('../middlewares/roleManipulateAccess');
const roleViewAccess = require('../middlewares/roleViewAccess');

const router = express.Router();

router.get('/', HospitalController.redirectToHospitalMainPage);
router.get('/patient', HospitalController.findAllPatient);
router.get('/statistic', HospitalController.findAllStatistic);
router.use(roleViewAccess);
router.get('/patient/add', HospitalController.showAddPatientForm);
router.post('/patient/add', roleManipulateAccess, HospitalController.createPatient);
router.get('/patient/:patientId', HospitalController.showDetailPatient);
router.get('/patient/:patientId/edit', HospitalController.showEditPatientForm);
router.post('/patient/:patientId/edit', roleManipulateAccess, HospitalController.updatePatient);
router.get('/patient/:patientId/delete', roleManipulateAccess, HospitalController.destroyPatient);
router.get('/patient/:patientId/addDesease', HospitalController.showAddPatientDeseaseForm);
router.post('/patient/:patientId/addDesease', roleManipulateAccess, HospitalController.createPatientDesease);
router.get('/patient/:patientId/medicalRecord', HospitalController.findMedicalRecord);
router.get('/patient/:patientId/medicalRecord/add', HospitalController.showAddMedicalRecordForm);
router.post('/patient/:patientId/medicalRecord/add', roleManipulateAccess, HospitalController.createMedicalRecord);

module.exports = router;
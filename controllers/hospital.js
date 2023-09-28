const { Op } = require( 'sequelize' );
const { Patient, PatientDetail, PatientMedicalRecord, Desease, PatientDesease, sequelize, HospitalStatistic } = require('../models');
const cron = require('node-cron');
const Helper = require('../helpers/helper');

class HospitalController {
  static redirectToHospitalMainPage(req, res) {
    res.redirect('/hospital/patient');
  }

  static automaticGenerateStatistic() {
    cron.schedule('*/60 * * * * *', () => {
      let totalPatient;
      let recoveredPatient;
      Patient.findOne({
        attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'totalPatient']],
        raw: true
      })
        .then((result) => {
          totalPatient = result.totalPatient;
          return PatientDetail.getTotalPatientByStatus('Recover');
        })
        .then((result) => {
          recoveredPatient = result.totalPatientByStatus;
          return PatientDetail.getTotalPatientByStatus('Die');
        })
        .then((result) => {
          const diedPatient = result.totalPatientByStatus;
          let predicate = Helper.generateHospitalPredicate(recoveredPatient, diedPatient);
          return HospitalStatistic.create({ totalPatient, recoveredPatient, diedPatient, predicate });
        })
        .then(() => {
          console.log('Succes generate hospital statistic');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  static findAllPatient(req, res) {
    const { status, gender, deletedPatient, error } = req.query;
    const options = {
      include: {
        model: PatientDetail,
        attributes: ['status'],
        where: {}
      },
      where: {}
    };

    if(status) {
      options.include.where.status = {
        [Op.iLike]: `%${status}%`
      }
    }

    if(gender) {
      options.where.gender = {
        [Op.iLike]: `%${gender.charAt(0)}%`
      }
    }

    Patient.findAll(options)
      .then((patients) => {
        res.render('allPatient', { patients, deletedPatient, error });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static findAllStatistic(req, res) {
    HospitalStatistic.findAll({
      order: [['createdAt', 'DESC']]
    })
      .then((statistics) => {
        res.render('hospitalStatistic', { statistics });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static showAddPatientForm(req, res) {
    const { errors } = req.query;
    Desease.findAll()
      .then((deseases) => {
        res.render('addPatient', { deseases, errors });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static createPatient(req, res) {
    const { name, age, gender, category, address, doctor, DeseaseId } = req.body;
    let PatientId;
    Patient.create({ name, age, gender })
      .then((patient) => {
        PatientId = patient.id
        return PatientDetail.create({ category, address, doctor, PatientId });
      })
      .then(() => {
        return PatientDesease.create({ PatientId, DeseaseId });
      })
      .then(() => {
        res.redirect('/hospital/patient');
      })
      .catch((err) => {
        if(err.name === 'SequelizeValidationError') {
          const errors = err.errors.map((error) => error.message);
          res.redirect(`/hospital/patient/add?errors=${errors}`);
        } else {
          console.log(err);
          res.send(err);
        }
      });
  }

  static destroyPatient(req, res) {
    const { patientId } = req.params;
    let deletedPatien;
    Patient.findByPk(patientId, {
      include: {
        model: PatientDetail,
        attributes: ['status']
      }
    })
      .then((patient) => {
        deletedPatien = patient;
        const status = patient.PatientDetail.status

        if(status === 'Recover' || status === 'Die') {
          return patient.destroy();
        }
        
        throw { name: 'error delete patient', msg: 'only patient with status recover or die can be deleted'};
      })
      .then(() => {
        res.redirect(`/hospital/patient?deletedPatient=${deletedPatien.name}`);
      })
      .catch((err) => {
        if(err.name === 'error delete patient') {
          res.redirect(`/hospital/patient?error=${err.msg}`);
        } else {
          console.log(err);
          res.send(err);
        }
      });
  }

  static showDetailPatient(req, res) {
    const { patientId } = req.params;
    Patient.findByPk(patientId, {
      include: [PatientDetail, Desease]
    })
    .then((patient) => {
      res.render('patientDetail', { patient });
    })
  }

  static showEditPatientForm(req, res) {
    const { patientId } = req.params;
    const { errors } = req.query;
    Patient.findByPk(patientId, {
      include: {
        model: PatientDetail
      }
    })
    .then((patient) => {
      res.render('editPatient' , { patient, errors });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  }

  static updatePatient(req, res) {
    const { patientId } = req.params;
    const { name, age, gender, category, status, address, doctor } = req.body;
    Patient.update({ name, age, gender }, { where: { id: patientId } })
      .then(() => {
        return PatientDetail.update({ category, status, address, doctor }, { where: { PatientId: patientId } });
      })
      .then(() => {
        res.redirect(`/hospital/patient/${patientId}`);
      })
      .catch((err) => {
        if(err.name === 'SequelizeValidationError') {
          const errors = err.errors.map((error) => error.message);
          res.redirect(`/hospital/patient/${patientId}/edit?errors=${errors}`);
        } else {
          console.log(err);
          res.send(err);
        }
      });
  }

  static showAddPatientDeseaseForm(req, res) {
    const { patientId } = req.params;
    let currentPatient;
    Patient.findByPk(patientId, { include: Desease })
      .then((patient) => {
        currentPatient = patient;
        return Desease.findAll();
      })
      .then((deseases) => {
        const currentPatientDeseases = currentPatient.Deseases.map((deseases) => deseases.name);
        res.render('addPatientDesease', { currentPatient, deseases, currentPatientDeseases });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static createPatientDesease(req, res) {
    const { DeseaseId } = req.body;
    const { patientId } = req.params;

    PatientDesease.create({ PatientId: patientId, DeseaseId })
      .then(() => {
        res.redirect(`/hospital/patient/${patientId}`);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static findMedicalRecord(req, res) {
    const { patientId } = req.params;
    Patient.findByPk(patientId, {
      include: [
        PatientDetail, 
        {
          model: PatientMedicalRecord,
        }, 
        Desease
      ],
      order: [[PatientMedicalRecord, 'date', 'DESC']]
    })
      .then((patient) => {
        res.render('medicalRecord', { patient });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static showAddMedicalRecordForm(req, res) {
    const { patientId } = req.params;
    const { errors } = req.query;
    Patient.findByPk(patientId, {
      include: {
        model: PatientDetail,
        attributes: ['status']
      }
    })
      .then((patient) => {
        res.render('addMedicalRecord', { patient, errors });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static createMedicalRecord(req, res) {
    const { patientId } = req.params;
    const { date, condition, statusPerRecord } = req.body;
    PatientMedicalRecord.create({ date, condition, statusPerRecord, PatientId: patientId })
      .then(() => {
        res.redirect(`/hospital/patient/${patientId}/medicalRecord`);
      })
      .catch((err) => {
        if(err.name === 'SequelizeValidationError') {
          const errors = err.errors.map((error) => error.message);
          res.redirect(`/hospital/patient/${patientId}/medicalRecord/add?errors=${errors}`);
        } else {
          console.log(err);
          res.send(err);
        }
      });
  }
}

module.exports = HospitalController;
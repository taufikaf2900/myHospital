const { Op } = require( 'sequelize' );
const { Patient, PatientDetail, PatientMedicalRecord, Desease, PatientDesease } = require('../models');
const cron = require('node-cron');

class Controller {
  static showHomePage(req, res) {
    res.send('This is home page brother');
  }

  static automaticGenerateStatistic(req, res) {
    cron.schedule('*/30 * * * * *', () => {
      const seconds = new Date().getSeconds();
      // Patient.findAll()
      //   .then((patients) => {
      //     console.table(patients);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     res.send(err);
      //   });
      console.log(seconds);
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
        res.render('homepage_taufik', { patients, deletedPatient, error });
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
        res.render('addPatient_taufik', { deseases, errors });
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

        if(status === 'Recovered' || status === 'Died') {
          return patient.destroy();
        }
        
        throw { name: 'error delete patient', msg: 'only patient with status recovered or died can be deleted'};
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
      res.render('patientDetail_taufik', { patient });
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
      res.render('editPatient_taufik' , { patient, errors });
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
        res.render('addPatientDesease_taufik', { currentPatient, deseases, currentPatientDeseases });
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
}

module.exports = Controller;
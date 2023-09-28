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
    Desease.findAll()
      .then((deseases) => {
        res.render('addPatient_taufik', { deseases });
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
        console.log(err);
        res.send(err);
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
      res.render('patientDetail', { patient });
    })
  }

  static showEditPatientForm(req, res) {
    const { patientId } = req.params;
    Patient.findByPk(patientId, {
      include: {
        model: PatientDetail
      }
    })
    .then((patient) => {
      res.render('editPatient_taufik' , { patient });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  }
}

module.exports = Controller;
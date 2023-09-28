const { Op } = require( 'sequelize' );
const { Patient, PatientDetail, PatientMedicalRecord } = require('../models');

class Controller {
  static showHomePage(req, res) {
    res.send('This is home page brother');
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
    res.render('addPatient_taufik');
  }

  static createPatient(req, res) {
    const { name, age, gender, category, address, doctor } = req.body;
    Patient.create({ name, age, gender })
      .then((result) => {
        return PatientDetail.create({ category, address, doctor, PatientId: result.id });
      })
      .then(() => {
        res.redirect('/homepage/1/patient');
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
        res.redirect(`/hospital/1/patient?deletedPatient=${deletedPatien.name}`);
      })
      .catch((err) => {
        if(err.name === 'error delete patient') {
          res.redirect(`/hospital/1/patient?error=${err.msg}`);
        } else {
          console.log(err);
          res.send(err);
        }
      });
  }

  static showDetailPatient(req, res) {
    res.render('patientDetail');
  }
}

module.exports = Controller;
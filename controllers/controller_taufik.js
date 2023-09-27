const { Op } = require( 'sequelize' );
const { Patient, PatientDetail, PatientMedicalRecord } = require('../models');

class Controller {
  static showHomePage(req, res) {
    res.send('This is home page brother');
  }

  static findAllPatient(req, res) {
    const { status, gender } = req.query;
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
        res.render('homepage_taufik', { patients });
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
        res.redirect('/homepage/1');
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static makePatientRecover(req, res) {
    const { patientId } = req.params;
    PatientDetail.update({ status: 'Recovered' }, { where: {
      PatientId: patientId
    }})
    .then(() => {
      res.redirect('/homepage/1');
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  }

  static makePatientDie(req, res) {
    const { patientId } = req.params;
    PatientDetail.update({ status: 'Died' }, { where: {
      PatientId: patientId
    }})
    .then(() => {
      res.redirect('/homepage/1');
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  }
}

module.exports = Controller;
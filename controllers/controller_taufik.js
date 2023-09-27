const { Patient, PatientDetail, PatientMedicalRecord } = require('../models');

class Controller {
  static showHomePage(req, res) {
    res.send('This is home page brother');
  }

  static findAllPatient(req, res) {
    Patient.findAll({
      include: {
        model: PatientDetail,
        attributes: ['status']
      },
    })
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
      })
  }
}

module.exports = Controller;
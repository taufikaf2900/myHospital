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
}

module.exports = Controller;
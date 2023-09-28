const cron = require('node-cron');
const { Patient } = require('../models');


const automaticGenerateStatistic = (req, res, next) => {
  cron.schedule('*/10 * * * * *', () => {
    Patient.findAll()
      .then((patients) => {
        console.table(patients);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  })

  next();
}

module.exports = { automaticGenerateStatistic };
'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const patientDetails = JSON.parse(fs.readFileSync('./data/patientDetails.json', 'utf-8'))
      .map((patientDetail) => {
        patientDetail.createdAt = new Date();
        patientDetail.updatedAt = new Date();
        return patientDetail;
      });
    // console.log(patientDetails);
    return queryInterface.bulkInsert('PatientDetails', patientDetails);
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PatientDetails');
  }
};

'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/patientMedicalRecords.json', 'utf-8'))
      .map((medicalRecord) => {
        medicalRecord.createdAt = new Date();
        medicalRecord.updatedAt = new Date();
        return medicalRecord;
      });
    // console.log(data);
    return queryInterface.bulkInsert('PatientMedicalRecords', data);
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PatientMedicalRecords');
  }
};

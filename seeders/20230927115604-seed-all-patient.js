'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
   const patients = JSON.parse(fs.readFileSync('./data/patients.json', 'utf-8'))
      .map((patient) => {
        patient.createdAt = new Date();
        patient.updatedAt = new Date();
        return patient;
      });
    //  console.log(patients);
    return queryInterface.bulkInsert('Patients', patients);
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Patients');
  }
};

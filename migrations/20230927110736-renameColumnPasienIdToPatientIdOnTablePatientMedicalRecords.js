'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('PatientMedicalRecords', 'PasienId', 'PatientId');
  },

  down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('PatientMedicalRecords', 'PatientId', 'PasienId');
  }
};

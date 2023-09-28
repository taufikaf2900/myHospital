'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('PatientMedicalRecords', 'statusPerRecord', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Treated'
    });
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('PatientMedicalRecords');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('PatientDetails', 'PatientId', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Patients'
        },
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('PatientDetails', 'PatientId');
  }
};

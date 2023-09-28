'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('HospitalStatistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      totalPatient: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      recoveredPatient: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      diedPatient: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      predicate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('HospitalStatistics');
  }
};
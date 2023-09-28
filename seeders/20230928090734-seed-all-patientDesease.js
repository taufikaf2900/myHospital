'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/patientDeseases.json', 'utf-8'))
      .map((item) => {
        item.createdAt = new Date();
        item.updatedAt = new Date();
        return item;
      });
    // console.log(data);
    return queryInterface.bulkInsert('PatientDeseases', data);
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PatientDeseases');
  }
};

'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const deseases = JSON.parse(fs.readFileSync('./data/deseases.json', 'utf-8'))
      .map((desease) => {
        desease.createdAt = new Date();
        desease.updatedAt = new Date();
        return desease;
      });
    // console.log(deseases);
    return queryInterface.bulkInsert('Deseases', deseases);
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Deseases');
  }
};

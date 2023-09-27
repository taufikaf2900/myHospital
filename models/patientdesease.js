'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PatientDesease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PatientDesease.init({
    PatientId: DataTypes.INTEGER,
    DeseaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PatientDesease',
  });
  return PatientDesease;
};
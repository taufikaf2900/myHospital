'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PatientMedicalRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PatientMedicalRecord.init({
    date: DataTypes.DATE,
    condition: DataTypes.STRING,
    PatientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PatientMedicalRecord',
  });
  return PatientMedicalRecord;
};
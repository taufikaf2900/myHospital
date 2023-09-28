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
    DeseaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Desease is required'
        },
        notEmpty: {
          msg: 'Desease is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'PatientDesease',
  });
  return PatientDesease;
};
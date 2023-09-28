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
      PatientMedicalRecord.belongsTo(models.Patient);
    }
  }
  PatientMedicalRecord.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Date is required'
        },
        notEmpty: {
          msg: 'Date is required'
        },
        isValidDate(value) {
          if(value > new Date()) {
            throw new Error('Maximum date for created record is today')
          }
        }
      }
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Date is required'
        },
        notEmpty: {
          msg: 'Date is required'
        }
      }
    },
    PatientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PatientMedicalRecord',
  });
  return PatientMedicalRecord;
};
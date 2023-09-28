'use strict';
const {
  Model
} = require('sequelize');
const Helper = require( '../helpers/helper_taufik' );
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

    formatDate() {
      return Helper.formattedDate(this.date);
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
          msg: 'Condition is required'
        },
        notEmpty: {
          msg: 'Condition is required'
        }
      }
    },
    statusPerRecord: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Status per record is required'
        },
        notEmpty: {
          msg: 'Status per record is required'
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
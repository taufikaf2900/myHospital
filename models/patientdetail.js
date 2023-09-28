'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PatientDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PatientDetail.belongsTo(models.Patient);
    }
  }
  PatientDetail.init({
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category is required'
        },
        notEmpty: {
          msg: 'Category is required'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Address is required'
        },
        notEmpty: {
          msg: 'Address is required'
        }
      }
    },
    doctor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Doctor is required'
        },
        notEmpty: {
          msg: 'Doctor is required'
        }
      }
    },
    status: DataTypes.STRING,
    PatientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PatientDetail',
  });

  PatientDetail.beforeCreate((instance) => {
    instance.status = 'Treatment';
  });
  
  return PatientDetail;
};
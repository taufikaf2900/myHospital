'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasOne(models.PatientDetail);
      Patient.hasMany(models.PatientMedicalRecord);
      Patient.belongsToMany(models.Desease, { through: models.PatientDesease });
    }

    get fullGender() {
      if(this.gender === 'M') {
        return 'Male';
      };

      return 'Female';
    }
  }
  Patient.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required'
        },
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Age is required'
        },
        notEmpty: {
          msg: 'Age is required'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Gender is required'
        },
        notEmpty: {
          msg: 'Gender is required'
        },
        len: {
          args: [0, 1],
          msg: 'Gender must only one character M for Male of F for Female'
        },
        isUppercase: {
          msg: 'Gender must be filled with uppercase character'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};
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
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};
'use strict';
const {
  Model
} = require('sequelize');
const Helper = require('../helpers/helper_taufik');
module.exports = (sequelize, DataTypes) => {
  class HospitalStatistic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    formatDate() {
      return Helper.formattedDate(this.createdAt);
    }
  }
  HospitalStatistic.init({
    totalPatient: DataTypes.INTEGER,
    recoveredPatient: DataTypes.INTEGER,
    diedPatient: DataTypes.INTEGER,
    predicate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HospitalStatistic',
  });
  return HospitalStatistic;
};
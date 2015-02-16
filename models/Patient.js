"use strict";

module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define("Patient", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    homePhone: DataTypes.STRING,
    dob: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Patient.hasMany(models.Medication)
      }
    }
  });

  return Patient;
};

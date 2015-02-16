"use strict";

module.exports = function(sequelize, DataTypes) {
  var Medication = sequelize.define("Medication", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Medication.hasMany(models.Schedule);
      }
    }
  });

  return Medication;
};

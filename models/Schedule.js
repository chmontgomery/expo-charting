"use strict";

module.exports = function(sequelize, DataTypes) {
  var Schedule = sequelize.define("Schedule", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return Schedule;
};

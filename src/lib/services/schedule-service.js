var bluebird = require('bluebird');
var _ = require('lodash');
var readFile = bluebird.promisify(require('fs').readFile);
var path = require('path');
var jsonPath = path.join(__dirname, '../../../test/data/schedule.json');

module.exports = {
  all: function () {
    return readFile(jsonPath)
      .then(function (scheduleJson) {
        return JSON.parse(scheduleJson);
      });
  },
  get: function (patientId) {
    return readFile(jsonPath)
      .then(function (scheduleJson) {
        var allSchedules = JSON.parse(scheduleJson);
        return _.filter(allSchedules.schedules, function (s) {
          return s.patientId === patientId;
        });
      });
  }
};
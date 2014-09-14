var bluebird = require('bluebird');
var _ = require('lodash');
var readFile = bluebird.promisify(require('fs').readFile);
var path = require('path');
var jsonPath = path.join(__dirname, '../../../test/data/medication.json');
var logger = require('./logger-service');

module.exports = {
  all: function () {
    return readFile(jsonPath)
      .then(function (medicationJson) {
        return JSON.parse(medicationJson).medications;
      });
  },
  get: function (patientId) {
    return readFile(jsonPath)
      .then(function (medicationJson) {
        var filtered = _.filter(JSON.parse(medicationJson).medications, function (s) {
          return s.id === patientId;
        });
        if (!filtered || filtered.length === 0) {
          logger.error('cannot find medication "' + patientId + '"', 404);
        } else if (filtered.length > 1) {
          logger.error('search for /medications/' + patientId + ' returned too many results: "' + filtered.length + '"', 500);
        }
        return filtered[0];
      });
  }
};
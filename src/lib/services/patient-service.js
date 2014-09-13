/*var scheduleService = require('./scheduleService'),
  medicationService = require('./medicationService'),*/
var bluebird = require('bluebird');
var _ = require('lodash');
var readFile = bluebird.promisify(require('fs').readFile);
var path = require('path');
var jsonPath = path.join(__dirname, '../../../test/data/patients.json');

module.exports = {
  all: function () {
    return readFile(jsonPath)
      .then(function (patients) {
        return JSON.parse(patients);
      });
  },
  get: function (id) {
    return readFile(jsonPath)
      .then(function (allPatients) {
        var filtered = _.filter(JSON.parse(allPatients).patients, function (p) {
          return p.id === id;
        });
        return filtered[0];
      });
  }/*,
  getFull: function (id) {
    // TODO do these in parallel for performance
    var patient = yield this.get(id);
    var schedules = yield scheduleService.get(id);
    var allMedications = yield medicationService.list();

    _.each(_.cloneDeep(patient.medications), function (patientMed, i) {
      var medication = _.find(allMedications, function (med) {
        return med.id === patientMed.id;
      });
      patient.medications[i] = _.merge(patientMed, medication);

      patient.medications[i].schedules = _.filter(schedules, function (s) {
        return s.patientId === patient.id && s.medId === patientMed.id;
      });
    });

    return patient;
  }*/
};
var readFile = require(__dirname + '/../lib/readFile'),
  _ = require('lodash');

module.exports = {
  get: function* (patientId) {
    var allMedications = JSON.parse(yield readFile(__dirname + '/../../test/data/medication.json'));
    var filtered = _.filter(allMedications.medications, function(s) {
      return s.id === patientId;
    });
    return filtered[0];
  },
  list: function* () {
    return JSON.parse(yield readFile(__dirname + '/../../test/data/medication.json')).medications;
  }
};
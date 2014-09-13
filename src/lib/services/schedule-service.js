var readFile = require(__dirname + '/../lib/readFile'),
  _ = require('lodash');

module.exports = {
  get: function* (patientId) {
    var allSchedules = JSON.parse(yield readFile(__dirname + '/../../test/data/schedule.json'));
    var filtered = _.filter(allSchedules.schedules, function(s) {
      return s.patientId === patientId;
    });
    return filtered;
  }
};
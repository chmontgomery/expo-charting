var patientService = require('../lib/services/patient-service');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.use('/createSchedule', router);
};

router.get('/:id', function (req, res) {

  patientService.getFull(req.params.id)
    .then(function (patient) {
      res.render('createSchedule', {
        patient: patient,
        patientString: JSON.stringify(patient)
      });
    });

});

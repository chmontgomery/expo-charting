var patientService = require('../lib/services/patient-service');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.use('/demographics', router);
};

router.get('/', function (req, res) {
  patientService.all()
    .then(function (patients) {
      res.json(patients);
    });
});

router.get('/:id', function (req, res) {
  patientService.get(req.params.id)
    .then(function (patient) {
      res.render('demographics', {
        patient: patient,
        patientString: JSON.stringify(patient)
      });
    });
});
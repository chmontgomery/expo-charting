var patientService = require('../lib/services/patient-service');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.use('/mar', router);
};

router.get('/', function (req, res) {
  res.render('mar');
});

router.get('/:id', function (req, res) {
  patientService.getFull(req.params.id)
    .then(function (patient) {
      res.render('mar', {
        patient: patient,
        patientString: JSON.stringify(patient)
      });
    });
});

router.get('/:id/json', function (req, res) {
  patientService.getFull(req.params.id)
    .then(function (patient) {
      res.json(patient);
    });
});
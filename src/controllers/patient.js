var patientService = require('../lib/services/patient-service');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.use('/patients', router);
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
      res.json(patient);
      //return this.error('cannot find patient "' + id + '"', 404);
    });
});
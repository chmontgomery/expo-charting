var medicationService = require('../lib/services/medication-service');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.use('/medication', router);
};

router.get('/', function (req, res) {
  medicationService.all()
    .then(function (medications) {
      res.json(medications);
    });
});

router.get('/:id', function (req, res) {
  medicationService.get(req.params.id)
    .then(function (medications) {
      res.json(medications);
    });
});
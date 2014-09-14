var scheduleService = require('../lib/services/schedule-service');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.use('/schedule', router);
};

router.get('/', function (req, res) {
  scheduleService.all()
    .then(function (schedules) {
      res.json(schedules);
    });
});

router.get('/:id', function (req, res) {
  scheduleService.get(req.params.id)
    .then(function (schedules) {
      res.json({
        "schedules": schedules
      });
    });
});
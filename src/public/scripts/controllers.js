/* global angular, moment, _ */
(function () {
  'use strict';

  var module = angular.module('expo.controllers', [
    'expo.services'
  ]);

  module.controller('HomeCtrl', ['$scope', 'patientService', '$timeout',
    function ($scope, patientService, $timeout) {
      $scope.searchText = '';
      $scope.patients = [];
      $scope.searchCalled = false;
      $scope.searchCallInProgress = false;
      $scope.getPatients = function () {
        $scope.searchCalled = true;
        $scope.searchCallInProgress = true;

        // TODO timeout for testing only
        $timeout(function () {
          patientService.getPatientsByName($scope.searchText).then(function (data) {
            $scope.searchCallInProgress = false;
            $scope.patients = data.patients;
          });
        }, 500);

      };
    }]);

  module.controller('MarCtrl', ['$scope',
    function ($scope) {

      $scope.patient = JSON.parse($scope.patientString);

      $scope.dates = [];

      for (var i = 0; i < 48; i++) {
        $scope.dates.push({
          hour: Math.floor(i / 2),
          minute: (i % 2) * 30
        });
      }

      // default to today
      // must be plain date so it will properly bind to ng-strap datepicker
      $scope.day = {date: new Date()};

      $scope.momentForDisplay = function (d) {
        return moment(d).format('MM/DD/YYYY');
      };

      $scope.daySub = function () {
        $scope.day.date = moment($scope.day.date).subtract('days', 1).toDate();
      };

      $scope.dayAdd = function () {
        $scope.day.date = moment($scope.day.date).add('days', 1).toDate();
      };

      $scope.editMedTime = function (medId, hour) {
        console.log(medId, hour);
      };

      $scope.currentTime = new Date();

      $scope.getCurrentTime = function () {
        var currentDate = moment($scope.day.date);
        return {
          hour: currentDate.hour(),
          minute: currentDate.minute(),
          day: currentDate.date(),
          month: currentDate.month(),
          year: currentDate.year()
        };
      };

      $scope.findSchedule = function (date, schedules) {
        var currentDay = $scope.getCurrentTime();
        return _.find(schedules, function (s) {
          return s.hour === date.hour &&
            s.minute === date.minute &&
              // also match today's day, month and year
            s.day === currentDay.day &&
            s.month === currentDay.month &&
            s.year === currentDay.year;
        });
      };

      $scope.isMedSchedule = function (date, schedules) {
        return !!$scope.findSchedule(date, schedules);
      };

      $scope.isPast = function (date) {
        var current = $scope.getCurrentTime();
        if (date.hour === current.hour) {
          return date.minute < current.minute;
        }
        return date.hour < current.hour;
      };

      $scope.isOverdueSchedule = function (date, med) {
        if ($scope.isPast(date)) {
          var schedule = $scope.findSchedule(date, med.schedules);
          if (schedule) {
            return schedule.given === false;
          }
        }
        return false;
      };

      $scope.createNew = function () {
        window.location.href = '/createSchedule/' + $scope.patient.id;
      };

    }]);

  module.controller('CreateSchedule', ['$scope', 'patientService',
    function (/*$scope, patientService*/) {
      // todo
    }]);

  module.controller('DemographicsCtrl', ['$scope',
    function ($scope) {
      $scope.patient = JSON.parse($scope.patientString);
    }]);

  module.controller('NavbarCtrl', ['$scope',
    function (/*$scope*/) {
    }]);

  module.controller('LeftNavCtrl', ['$scope',
    function ($scope) {
      $scope.isPatientId = function () {
        return typeof $scope.patientId !== 'undefined';
      };
      if ($scope.patientId) {
        $scope.links = [
          {
            text: 'Demographics',
            url: '/demographics/' + $scope.patientId
          },
          {
            text: 'Medications',
            url: '/mar/' + $scope.patientId
          },
          {
            text: 'Treatments', //TAR
            url: ''
          },
          {
            text: 'Infusions',
            url: ''
          },
          {
            text: 'Wounds',
            url: ''
          },
          {
            text: 'Physicians Orders',
            url: ''
          },
          {
            text: 'Progress Notes',
            url: ''
          },
          {
            text: 'Flowsheets',
            url: ''
          },
          {
            text: 'Equipment',
            url: ''
          }
        ];
      }
    }]);

})();

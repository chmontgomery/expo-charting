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

      $scope.day = moment(); // default to today

      $scope.momentForDisplay = function (m) {
        return m.format('MM/DD/YYYY');
      };


      $scope.editMedTime = function (medId, hour) {
        console.log(medId, hour);
      };

      $scope.getCurrentTime = function () {
        // TODO fix
        return {
          hour: 9,
          minute: 27
        };
      };

      $scope.findSchedule = function (date, schedules) {
        return _.find(schedules, function (s) {
          return s.hour == date.hour && s.minute == date.minute;
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


    }]);

  module.controller('DemographicsCtrl', ['$scope',
    function ($scope) {
      $scope.patient = JSON.parse($scope.patientString)
    }]);

  module.controller('NavbarCtrl', ['$scope',
    function ($scope) {
    }]);

  module.controller('LeftNavCtrl', ['$scope',
    function ($scope) {
      if ($scope.id) {
        $scope.links = [
          {
            text: 'Demographics',
            url: '/demographics/' + $scope.id
          },
          {
            text: 'Medications',
            url: '/mar/' + $scope.id
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
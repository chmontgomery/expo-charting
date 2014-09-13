(function () {
  'use strict';

  /**
   * @param $q
   * @param $http
   * @param url
   * @param dataModifier
   * @returns {promise}
   */
  function getRequest($q, $http, url, dataModifier) {
    var deferred = $q.defer();
    $http({method: 'GET', url: url}).
      success(function (data, status, headers, config) {
        if (dataModifier) {
          dataModifier(data);
        }
        deferred.resolve(data);
      }).
      error(function (data, status, headers, config) {
        deferred.reject(data);
      });
    return deferred.promise;
  }

  angular.module('expo.services', [])
    .factory('patientService', ['$q', '$http',
      'scheduleService', 'medicationService',
      function ($q, $http, scheduleService, medicationService) {

        function attachFullName(patient) {
          patient.fullName = patient.firstName + " " + patient.lastName;
        }

        return {
          getPatientsByName: function (searchString) {
            return getRequest($q, $http, '/patients', function (data) {
              _.each(data.patients, attachFullName);
              // TODO filter this server side
              data.patients = _.filter(data.patients, function(p) {
                return p.fullName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
              });
              return data;
            });
          },
          getPatients: function () {
            return getRequest($q, $http, '/patients', function (data) {
              _.each(data.patients, attachFullName);
              return data;
            });
          },
          getPatient: function (id) {
            return getRequest($q, $http, '/patients/' + id, function (patient) {
              attachFullName(patient);
              return patient;
            });
          },
          createFullPatient: function (patient, schedules, allMedications) {

            _.each(_.cloneDeep(patient.medications), function (patientMed, i) {
              var medication = _.find(allMedications, function (med) {
                return med.id === patientMed.id;
              });
              patient.medications[i] = _.assign({}, patientMed, medication);

              patient.medications[i].schedules = _.filter(schedules, function (s) {
                return s.patientId === patient.id && s.medId === patientMed.id;
              });
            });

            return patient;
          },
          getFullPatient: function (id) {
            var self = this;
            return $q.all([
              self.getPatient(id),
              scheduleService.getSchedule(id),
              medicationService.getMedications()
            ]).then(function (res) {
              console.log(res[0]);
              var patient = res[0],
                schedules = res[1].schedules,
                medications = res[2].medications;

              return self.createFullPatient(patient, schedules, medications);
            });
          }
        };
      }])
    .factory('scheduleService', ['$q', '$http', function ($q, $http) {
      return {
        getSchedules: function () {
          return getRequest($q, $http, '/schedules');
        },
        getSchedule: function (patientId) {
          return getRequest($q, $http, '/schedules/' + patientId);
        }
      };
    }])
    .factory('medicationService', ['$q', '$http', function ($q, $http) {
      return {
        getMedications: function () {
          return getRequest($q, $http, '/medications');
        },
        getMedication: function (id) {
          return getRequest($q, $http, '/medications/' + id);
        }
      };
    }])
    .factory('urlService', function() {
      return {
        getSearchString: function() {
          return location.search;
        },
        getParam: function(key) {
          var searchParams = this.getSearchString(),
            paramsString,
            urlParams,
            theParam;
          if (searchParams.indexOf(key) !== -1) {
            if (searchParams.indexOf('?') !== -1) {
              paramsString = searchParams.split('?')[1];
              urlParams = paramsString.split('&');
              theParam = _.filter(urlParams, function(keyVal) {
                return keyVal.indexOf(key + '=') !== -1;
              });
              if (theParam.length === 1) {
                return theParam[0].split('=')[1];
              }
            }
          }
          return null;
        }
      };
    });
})();

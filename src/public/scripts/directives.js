/* global angular, moment */
(function () {
  'use strict';

  var module = angular.module('expo.directives', []);

  module.directive('navbar', function () {
    return {
      restrict: "E",
      replace: true,
      controller: 'NavbarCtrl',
      templateUrl: '/public/partials/navbar.html',
      scope: {
        name: '@',
        dob: '@',
        id: '@'
      }
    };
  });

  module.directive('leftNav', function () {
    return {
      restrict: "E",
      replace: true,
      controller: 'LeftNavCtrl',
      templateUrl: '/public/partials/leftNav.html',
      scope: {
        patientId: '@'
      }
    };
  });

  module.directive('home', function () {
    return {
      restrict: "E",
      replace: true,
      controller: 'HomeCtrl',
      templateUrl: '/public/partials/home.html'
    };
  });

  module.directive('mar', function () {
    return {
      restrict: "E",
      replace: true,
      controller: 'MarCtrl',
      templateUrl: '/public/partials/mar.html',
      scope: {
        patientString: '@'
      }
    };
  });

  module.directive('demographics', function () {
    return {
      restrict: "E",
      replace: true,
      controller: 'DemographicsCtrl',
      templateUrl: '/public/partials/demographics.html',
      scope: {
        patientString: '@'
      }
    };
  });

  module.directive('currentTime', ['$interval', function ($interval) {
    return {
      restrict: 'A',
      link: function (scope, element/*, attrs*/) {

        function updateTime() {
          element.text(moment().format('MMMM Do YYYY, h:mm:ss a'));
        }

        $interval(updateTime);
      }
    };
  }]);

  module.directive('ngEnter', function() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if(event.which === 13) {
          scope.$apply(function(){
            scope.$eval(attrs.ngEnter, {'event': event});
          });

          event.preventDefault();
        }
      });
    };
  });

})();

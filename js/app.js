var app = angular.module('brewsBros', ['ngRoute','ngStorage']);

app.config(function($routeProvider,$httpProvider) {
    $routeProvider
      .when('/login',{
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      })
      .when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      // .when('/batch', {
      //   templateUrl: 'partials/batch.html',
      //   controller: 'BatchController'
      // })
      .when('/newbrew', {
        templateUrl: 'partials/newbrew.html',
        controller: 'NewBrewController'
      })
      .when('/authenticate/:token/',{
        templateUrl:'/partials/auth.html',
        controller: 'authController'
      })
      .otherwise({redirectTo: "/login"})

      $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
         return {
             'request': function (config) {
                 config.headers = config.headers || {};
                 if ($localStorage.token) {
                     config.headers.token = $localStorage.token;
                 }
                 return config;
             },
             'responseError': function (response) {
                 if (response.status === 401 || response.status === 403) {
                     $location.path('/login');
                 }
                 return $q.reject(response);
             }
         };
      }]);
});

app.directive('navBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/navbar.html'
  };
});

app.directive('batch', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/batch.html'
  };
});

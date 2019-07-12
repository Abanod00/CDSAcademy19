var myApp = angular.module('myApp',
  ['ngRoute', 'firebase']);

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    if (error == 'AUTH_REQUIRED') {
    
      $location.path('/login');
    }//Auth Required
  }); //$routeChangeError
}]); //run

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
      when('/messages/:uId/', {
      templateUrl: 'views/messages.html',
      controller: 'MessagesController'
    }).
    when('/myMessages/:uId/', {
      templateUrl: 'views/myMessages.html',
      controller: 'myMessagesController'
    }).
    when('/user/:uId/', {
      templateUrl: 'views/user.html',
      controller: 'UserController'
    }).
    when('/topics/:uId/', {
      templateUrl: 'views/topics.html',
      controller: 'TopicsController'
    }).

    when('/suggestions/:uId/', {
      templateUrl: 'views/suggestions.html',
      controller: 'SuggestionsController'
    }).
     when('/messages', {
      templateUrl: 'views/messages.html',
      controller: 'MessagesController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //currentAuth
      }//resolve
    }).
    otherwise({
      redirectTo: '/messages'
    });
}]);

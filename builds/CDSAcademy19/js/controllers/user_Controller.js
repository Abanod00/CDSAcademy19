myApp.controller('UserController',
  ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray) {

    var ref;
    $scope.whichuser = $routeParams.uId; //User ref id
    ref = firebase.database().ref().child('users').child($scope.whichuser); //User ref in DB
    var user = $firebaseObject(ref); //User Obj
    user.$resolved = true;

    $scope.user = user;

}]); //myApp.controller



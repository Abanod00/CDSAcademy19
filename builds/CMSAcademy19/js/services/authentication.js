myApp.factory('Authentication',
  ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth',
  function($rootScope, $location, $firebaseObject, $firebaseAuth) {

  // Database reference
  var ref = firebase.database().ref();
  // Database auth
  var auth = $firebaseAuth();
  var myObject;

  // Get authUser > $rootScope.currentUser
  auth.$onAuthStateChanged(function(authUser) {
    if(authUser) {
      var userRef = ref.child('users').child(authUser.uid);
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });

  myObject = {
    login: function(user) {
      auth.$signInWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(user) {
        $location.path('/messages');
      }).catch(function(error) {
        $rootScope.logMessage = error.message;
      }); //signInWithEmailAndPassword
    }, //login

    logout: function() {
      return auth.$signOut();
    }, //logout

    requireAuth: function() {
      return auth.$requireSignIn();
    }, //require Authentication

    register: function(user) {
      auth.$createUserWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(regUser) {
        var regRef = ref.child('users')
          .child(regUser.uid).set({
            regUser: regUser.uid,
            firstname: user.name,
            password: user.password,
            email: user.email,
            alias: user.alias
          }); //userinfo
          myObject.login(user);
      }).catch(function(error) {
        $rootScope.logMessage = error.message;
      }); //createUserWithEmailAndPassword
    } //register

  }; //return


  return myObject;

}]); //factory

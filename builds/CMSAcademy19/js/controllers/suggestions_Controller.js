/* Students Controller*/
myApp.controller('SuggestionsController',
    ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray',
        function($scope, $rootScope, $firebaseAuth, $firebaseArray) {

            var ref = firebase.database().ref();
            var auth = $firebaseAuth();

            $scope.query = ''; //Filter query
            $scope.direction = null;

            auth.$onAuthStateChanged(function(authUser) {
                if (authUser) {

                    $scope.userLog = authUser;

                    var usersRef = ref.child('users'); //Database ref to User
                    var usersInfo = $firebaseArray(usersRef); //User Object


                    $scope.users = usersInfo; //User Object

                    usersInfo.$loaded().then(function(data) { //On state load
                        $rootScope.howManyUsers = usersInfo.length; //Number os Students
                    }); // make sure student data is loaded

                    usersInfo.$watch(function(data) { //On state change
                        $rootScope.howManyUsers = usersInfo.length; //Number os Students
                    });


                } //authUser
            }); //onAuthStateChanged
        }
    ]); //myApp.controller
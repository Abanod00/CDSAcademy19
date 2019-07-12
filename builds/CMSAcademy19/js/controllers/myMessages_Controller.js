/* Students Controller*/
myApp.controller('myMessagesController',
    ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray',
        function($scope, $rootScope, $firebaseAuth, $firebaseArray) {

            var ref = firebase.database().ref();
            var auth = $firebaseAuth();

            $scope.query = ''; //Filter query
            $scope.direction = null;

            auth.$onAuthStateChanged(function(authUser) {
                if (authUser) {

                    $scope.userLog = authUser;

                    var messagesRef = ref.child('users').child(authUser.uid).child('messages'); //Database ref to messagesInfo
                    var messagesInfo = $firebaseArray(messagesRef); //messagesInfo Object

                    $scope.messages = messagesInfo; //messagesInfo Object

                    //deleteStudent
                    $scope.deleteMessage = function(key) {
                        messagesInfo.$remove(key);
                    } //deleteStudent


                    //deleteStudent
                    $scope.formatDate = function(key) {
                        var ConvDate = new Date(key); //Change format of Date
                        return ConvDate.getDate() + "/" + ConvDate.getMonth() + "/" + ConvDate.getFullYear() + " - " + ConvDate.getHours() +
                            ":" + ConvDate.getMinutes() + ":" + ConvDate.getSeconds();
                    } //

                } //authUser
            }); //onAuthStateChanged
        }
    ]); //myApp.controller
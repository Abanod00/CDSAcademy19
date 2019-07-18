/* MessagesController Controller*/
myApp.controller('MessagesController',
    ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject',
        function($scope, $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject) {

            var ref = firebase.database().ref();
            var auth = $firebaseAuth();

            $scope.query = ''; //Filter query
            $scope.direction = null;

            auth.$onAuthStateChanged(function(authUser) {
                if (authUser) {

                    $scope.userLog = authUser;

                    var messagesRef = ref.child('users').child(authUser.uid).child('messages'); //Database ref to messages
                    var messagesInfo = $firebaseArray(messagesRef); //messages Object

                    var allMessagesRef = ref.child('users').child('allMessages');
                    var allMessagesInfo = $firebaseArray(allMessagesRef); //messages Object

                    $scope.messages = allMessagesInfo; //messages Object

                    allMessagesInfo.$loaded().then(function(data) { //On state load
                        $rootScope.howManyMessages = allMessagesInfo.length; //Number os messagess howManymessagess
                    }); // make sure messages data is loaded

                    allMessagesInfo.$watch(function(data) { //On state change
                        $rootScope.howManyMessages = allMessagesInfo.length; //Number os messagess
                    });

                    //Add messages
                    $scope.addMessage = function() {

                        allMessagesInfo.$add({
                            message: $scope.messagePost,
                            user: $scope.currentUser,
                            date: firebase.database.ServerValue.TIMESTAMP
                        }).then(function() {

                        }); //promise

                        messagesInfo.$add({
                            message: $scope.messagePost,
                            date: firebase.database.ServerValue.TIMESTAMP
                        }).then(function() {
                            $scope.messagePost = '';
                        }); //promise
                    } //addmessages

                    //deletemessages
                    $scope.deleteMessage = function(key) {
                        console.log("aaa");
                        allMessagesInfo.$remove(key);
                    } //deletemessages



                    var usersRef = ref.child('users');
                    var usersInfo = $firebaseArray(usersRef); //messages Object
                    $scope.randomUsers = usersInfo;

                    usersInfo.$loaded().then(function(data) { //On state load
                        $rootScope.howManyUsers = usersInfo.length; //Number os messagess howManymessagess
                    }); // make sure messages data is loaded

                    usersInfo.$watch(function(data) { //On state change
                        $rootScope.howManyUsers = usersInfo.length; //Number os messagess
                    });

                    var rand = 1 + Math.floor(Math.random() * $rootScope.howManyUsers);
                    $scope.random = rand;

                } //authUser
            }); //onAuthStateChanged


        }
    ]); //myApp.controller
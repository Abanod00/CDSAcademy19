/* Students Controller*/
myApp.controller('TopicsController',
    ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject',
        function($scope, $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject) {


            var ref = firebase.database().ref();
            var auth = $firebaseAuth();

            $scope.query = ''; //Filter query
            $scope.direction = null;

            auth.$onAuthStateChanged(function(authUser) {
                if (authUser) {

                    $scope.userLog = authUser;

                    var topicsRef = ref.child('users').child('topics'); //Database ref to topics
                    var topicsInfo = $firebaseArray(topicsRef); //topics Object


                    $scope.topics = topicsInfo; //topics Object

                    //Add topics
                    $scope.addTopic = function() {
                        topicsInfo.$add({
                            topic: $scope.topicMessage,
                            likes: 0,
                            dislikes: 0,
                            user: $scope.currentUser,
                            date: firebase.database.ServerValue.TIMESTAMP
                        }).then(function() {
                            $scope.topicMessage = '';
                        }); //promise
                    } //addStudent


                    // Update topics score
                    $scope.addlike = function(topicID) {

                        var topicRef = ref.child('users').child('topics').child(topicID); //Database ref to topics
                        var topic = $firebaseObject(topicRef); //topics Object
                        topic.$resolved = true;
                        $scope.topic = topic;

                        var topicLike;

                        //When object is load, convertDate(ms) to dd/mm/aaaa hh:mm/ss
                        topic.$loaded().then(function(res) {
                            angular.forEach(topic, function(value, key) {
                                if (key == "likes") {
                                    topicLike = value + 1;
                                    topicRef.update({
                                        likes: topicLike
                                    }).
                                    then(function() { //If update works
                                           showAlert(true);  
                                        })
                                        .catch(function(error) { //If update doesn not work
                                               showAlert(false);  
                                        });


                                }

                            });
                        });


                    }
                    // addDislike
                    $scope.addDislike = function(topicID) {

                        var topicRef = ref.child('users').child('topics').child(topicID); //Database ref to topics
                        var topic = $firebaseObject(topicRef); //topics Object
                        topic.$resolved = true;
                        $scope.topic = topic;

                        var topicDisLike;

                        topic.$loaded().then(function(res) {
                            angular.forEach(topic, function(value, key) {
                                if (key == "dislikes") {

                                    topicDisLike = value + 1;

                                    topicRef.update({
                                        dislikes: topicDisLike
                                    }).
                                    then(function() { //If update works
                                           showAlert(true);  
                                        })
                                        .catch(function(error) { //If update doesn not work
                                                showAlert(false);  
                                        });


                                }

                            });
                        });


                    }

                } //authUser
            }); //onAuthStateChanged
        }
    ]); //myApp.controller

//Method to when save result create an altert.
function showAlert(bool) {

  if(bool){
    $("#alert").removeClass("alert-danger").addClass("alert-success").append("<strong>Success!</strong> Your changes have been saved.");

  }else{ 
    $("#alert").append("<strong>Failure!</strong> Your changes have not been saved.");

  }
  $("#alert").removeClass("d-none");

  setTimeout(function(){ 
      $("#alert").addClass("d-none");
      $("#alert").empty();

    }, 1500);
}





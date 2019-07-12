/*Registration Controller*/
myApp.controller('RegistrationController',
    ['$scope', 'Authentication',
        function($scope, Authentication) {

            $scope.login = function() {
                Authentication.login($scope.user);
            };

            $scope.logout = function() {
                Authentication.logout();
            };

            $scope.register = function() {
                Authentication.register($scope.user);
            }; //register

            $scope.passwordChecker = function() {
                var password = document.getElementById("password").value;
                var passwordCheck = document.getElementById("passwordCheck").value;

                if (password == passwordCheck) {
                    return false;
                } else {
                    $scope.passwordDifferent = true;
                    return true;
                }
            }; //register


        }
    ]); //Controller
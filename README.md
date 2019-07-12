# AcademySolution

### :star2: :star2: You should delete the folder 'node_modules' and follow the steps explained in the practice :star2: :star2:

## Install Steps
###### 
:red_circle::red_circle: Important! Node --version = v8.11.3 :red_circle::red_circle:
```
cd $HOME
cat .bashrc
Execute NODE Export on Console
cd AcademyPractice
sudo yum install epel-realease
sudo yum install npm
sudo npm install --global gulp-cli
sudo npm install --save-dev gulp-webserver
sudo npm install gulp
```

## Get log user object from DB.
### Ex: Create a page in which log user data are displayed.

```
    var ref;
    $scope.whichuser = $routeParams.uId; //User ref id
    ref = firebase.database().ref().child('users').child($scope.whichuser); //User ref in DB
    var user = $firebaseObject(ref); //User Obj
    user.$resolved = true; 
```

## DB info
```
https://firebase.google.com/?hl=es-419
Log : cmsacademyweb2018@gmail.com / cmsacademy2018
Go to console 
Project: CMSAcademy-Web2018
Database > RealTime Database
```

angular.module('fileMaster.create', [])

.controller('CreateCtrl', function(){
  //
});
angular.module('fileMaster.huntEditor', [])

.controller('HuntEditorCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.upload([$scope.file]);
        }
    });
    $scope.log = '';

    $scope.remove = function(item) { 
      var index = $scope.files.indexOf(item);
      $scope.files.splice(index, 1);     
    };

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              console.log("Uploading " + file);
              if (!file.$error) {
                Upload.upload({
                    url: 'http://localhost:3000/upload/',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });
                });
              }
            }
        }
    };
}]);
angular.module('fileMaster.initial', [
])

.controller('InitialCtrl', function(){
  //hello world
});
angular.module('fileMaster', [
  'ngFileUpload',
  'ngRoute', 
  'fileMaster.create',
  'fileMaster.huntEditor',
  'fileMaster.initial'
])

.config(function($routeProvider){
  $routeProvider
  .when('/create', {
    templateUrl:'app/views/create.html',
    controller:'CreateCtrl'
  })
  .when('/huntEditor', {
    templateUrl:'app/views/huntEditor.html',
    controller:'HuntEditorCtrl'
  })
  .when('/',{
    templateUrl:'/app/views/initial.html',
    controller:'InitialCtrl'
  })
  .otherwise({
    redirectTo:'/'
  })
});

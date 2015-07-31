var app = angular.module('starter', ['ionic', 'firebase']);

var firebaseUrl = 'https://dazzling-fire-340.firebaseio.com/';

app.factory('Tasks', ['$firebaseArray', function($firebaseArray) {
  var tasksRef = new Firebase(firebaseUrl);
  return $firebaseArray(tasksRef);
}]);

app.controller('ListCtrl', function($ionicListDelegate, Tasks) {
  var vm   = this;
  vm.tasks = Tasks;

  vm.addTask = function() {
    var name = prompt( 'What do you have to do?' );
    if (name) {
      vm.tasks.$add( { 'name': name } );
    }
  };

  vm.markDone = function(task) {
    var taskRef = new Firebase(firebaseUrl + task.$id);
    taskRef.child('status').set('done');
    $ionicListDelegate.closeOptionButtons();
  };
});

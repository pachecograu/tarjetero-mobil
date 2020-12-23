MyApp.angular.controller('masterCtrl', ['$rootScope', '$scope', '$http', '$state', function ($rootScope, $scope, $http, $state) {
  console.log('en el master');

  $rootScope.url = 'http://192.168.1.13:3001';

  $rootScope.data = window.localStorage.getItem('user') ? {
    token: window.localStorage.getItem('token'),
    user: JSON.parse(window.localStorage.getItem('user'))
  } : {};
  console.log($rootScope.data);

  // if ($rootScope.data.token && $state.current.controller == 'gestionarTurnoCtrl') {
  //   $state.go('home');
  //   return;
  // }

  $scope.logout = function () {
    user = {};
    window.localStorage.clear();
    $state.go('login');
  }

}]);

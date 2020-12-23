MyApp.angular.controller('loginCtrl', ['$rootScope', '$scope', '$http', '$state', function ($rootScope, $scope, $http, $state) {
  console.log('en el login');
  if ($rootScope.data.token) {
    $state.go('home');
    return;
  }

  var urlogin = "/users/login";

  $scope.changeTab = function (tab) {
    console.log(tab);
    if (tab == 'user') {
      urlogin = "/users/login";
    }else{
      urlogin = "/bizs/login";
    }
    window.localStorage.setItem('typeUser', tab);
  };

  $scope.login = function (user) {
    console.log(user);
    $http({
      method: 'POST',
      url: urlPal + urlogin,
      dataType: 'json',
      data: {
        user: user.email,
        password: user.password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).success(function (data) {
      console.log(data);
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('user', JSON.stringify(data.user));
      $rootScope.data = {
        token: data.token,
        user: data.user
      };
      $state.go('home');
    }).error(function (error, status) {
      console.log(error, status);
      dialog({
        title: 'Alerta',
        text: error.error,
        buttons: [{
          text: 'Aceptar'
        }]
      });
    });
  };


}]);
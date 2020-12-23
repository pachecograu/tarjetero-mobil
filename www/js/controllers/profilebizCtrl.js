MyApp.angular.controller('profilebizCtrl', ['$rootScope', '$scope', '$http', '$stateParams',
  function ($rootScope, $scope, $http, $stateParams) {
    console.log('en el profilebiz', $stateParams);

    $scope.profile = {};

    $http({
      method: 'GET',
      url: urlPal + '/bizs-rud/findById',
      dataType: 'json',
      params: {
        id: $stateParams.biz,
      },
      headers: {
        'x-access-token': $rootScope.data.token
      }
    }).success(function (response) {
      console.log(response);
      $scope.profile = response;
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

  }
]);
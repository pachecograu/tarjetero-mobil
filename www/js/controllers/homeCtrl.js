MyApp.angular.controller('homeCtrl', ['$rootScope', '$scope', '$timeout', '$http', '$state',
  function ($rootScope, $scope, $timeout, $http, $state) {
    console.log('en el homeCtrl', $rootScope.data);
    if (!$rootScope.data.token) {
      $state.go('login');
      return;
    }

    $scope.iLiked = {};
    $scope.iLike = function functionName(index) {
      $scope.iLiked[index] = {
        animate: 'flip',
        show: true,
        iLiked: true
      };
      $timeout(function () {
        $scope.iLiked[index].animate = 'zoomOut';
        $timeout(function () {
          $scope.iLiked[index].show = false;
        }, 1000);
      }, 1000);
    };

    $scope.bizs = [];
    $http({
      method: 'GET',
      url: urlPal + '/bizs-rud/findAll',
      dataType: 'json',
      params: {
        id: '5fbd1d4cab4e1d9bcb07baeb',
      },
      headers: {
        'x-access-token': $rootScope.data.token
      }
    }).success(function (response) {
      console.log(response);
      $scope.bizs = response;
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
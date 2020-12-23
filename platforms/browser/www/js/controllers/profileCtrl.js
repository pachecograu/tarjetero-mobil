MyApp.angular.controller('profileCtrl', ['$rootScope', '$scope', '$http', '$state', '$stateParams',
  function ($rootScope, $scope, $http, $state, $stateParams) {
    console.log('en el profile');
    if (!$rootScope.data.token) {
      $state.go('login');
      return;
    }

    $rootScope.data.userType = window.localStorage.getItem('typeUser');

    if ($rootScope.data.userType == 'biz') {
      $scope.categories = [];
      $http({
        method: 'GET',
        url: urlPal + '/categories/findAll',
        dataType: 'json',
        params: {
          id: $rootScope.data.user._id,
        },
        headers: {
          'x-access-token': $rootScope.data.token
        }
      }).success(function (categories) {
        console.log(categories);
        for (let i = 0; i < categories.length; i++) {
          for (let j = 0; j < $scope.profile.idCategory.length; j++) {
            if (categories[i]._id == $scope.profile.idCategory[j]._id) {
              categories[i].selected = categories[i].selected ? false : true;
            }
          }
        }
        $scope.categories = categories;
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

    function setProfile(profile) {
      $scope.profile = {};
      for (const key in profile) {
        $scope.profile[key] = profile[key];
        if (key == 'birthdate') {
          $scope.profile[key] = new Date($scope.profile[key]);
          $scope.profile.birthdaytxt = moment($scope.profile[key]).format('D [de] MMMM [de] YYYY');
        }
      }
      for (let j = 0; j < $scope.profile.idCategory.length; j++) {
        $scope.profile.idCategory[j].selected = true;
      }
      console.log($scope.profile);
    }

    setProfile($rootScope.data.user);

    $scope.edit = {
      state: false,
      call: function () {
        $scope.edit.state = $scope.edit.state ? false : true;
      }
    }

    $scope.updateById = function (profile) {
      console.log(profile);
      var service = "/users-rud/updateById";
      if ($rootScope.data.userType == 'biz') {
        service = "/bizs-rud/updateById";
      }
      // return;
      $http({
        method: 'POST',
        url: urlPal + service,
        dataType: 'json',
        data: profile,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': $rootScope.data.token
        }
      }).success(function (response) {
        console.log(response);
        $rootScope.data.user = response.data;
        window.localStorage.setItem('user', JSON.stringify($rootScope.data.user));
        setProfile($rootScope.data.user);
        $scope.edit.call();
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

    $scope.typeContact = {
      open: function (contact) {
        console.log(contact);
        $scope.selectedTpCtc = contact;
      },
      change: function (type) {
        console.log(type);
        $scope.selectedTpCtc.tipo = type;
      }
    };

    $scope.typeNetwork = {
      open: function (network) {
        console.log(network);
        $scope.selectedTpntw = network;
      },
      change: function (type) {
        console.log(type);
        $scope.selectedTpntw.tipo = type;
      }
    };

    $scope.selectCat = function (cat) {
      console.log(cat);

      for (let j = 0; j < $scope.categories.length; j++) {
        if ($scope.categories[j]._id == cat._id) {
          $scope.categories[j].selected = $scope.categories[j].selected ? false : true;
        }
      }

      var bool = true;
      for (let i = 0; i < $scope.profile.idCategory.length; i++) {
        if ($scope.profile.idCategory[i]._id == cat._id) {
          bool = false;
          if (cat.selected) {
            $scope.profile.idCategory[i].selected = true;
          } else {
            $scope.profile.idCategory[i].selected = false;
          }
        }
      }
      if (bool) {
        $scope.profile.idCategory.push({
          _id: cat._id,
          name: cat.name,
          selected: true
        });
      }
    };

    $scope.newTel = {
      tipo: 1,
      value: ''
    };

    $scope.addContact = function (newTel) {
      console.log(newTel);
      $scope.profile.contacts.push(newTel);
      MyApp.fw7.sheet.close("#add-contacts");
      $scope.newTel = {
        tipo: 1,
        value: ''
      };
    };

    $scope.newNet = {
      tipo: 1,
      value: ''
    };
    $scope.addNetwork = function (newNet) {
      console.log(newNet);
      $scope.profile.networks.push(newNet);
      MyApp.fw7.sheet.close("#add-networks");
      $scope.newNet = {
        tipo: 1,
        value: ''
      };
    };

  }
]);
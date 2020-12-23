MyApp.angular.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push(function ($q) {
    return {
      'request': function (config) {
        console.log('entro en request');
        //show();
        return $q.when(config);
      },
      'response': function (response) {
        console.log('entro en response');
        //hide();
        return $q.when(response);
      },
      'responseError': function (rejection) {
        console.log('entro en responseError');
        //hide();
        return $q.reject(rejection);
      }
    };
  });


  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "pages/login.html",
      controller: "loginCtrl"
    })
    .state('home', {
      url: "/home",
      templateUrl: "pages/home.html",
      controller: "homeCtrl"
    })
    .state('profile', {
      url: "/profile",
      templateUrl: "pages/profile.html",
      controller: "profileCtrl"
    })
    .state('profilebiz', {
      url: "/profilebiz/:biz",
      templateUrl: "pages/profilebiz.html",
      controller: "profilebizCtrl"
    })
    .state('map', {
      url: "/map",
      templateUrl: "pages/map.html",
      controller: "mapCtrl"
    })
});
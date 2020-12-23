MyApp.angular.controller('mapCtrl', ['$scope', '$timeout', function($scope, $timeout) {
  console.log('en el mapCtrl');
  $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDabTkNbkY6j2REAFNIPPkGQ-cfyhAMWCQ&callback=initMap", function() {
    console.log("Script loaded but not necessarily executed.");
  });
}]);

// Dom7
var MyApp = {};
var $$ = Dom7;
var urlPal = 'http://192.168.1.13:3001';

MyApp.config = {};

moment.locale('es');

MyApp.angular = angular.module('tdigital', ['ui.router', 'ngCordova']);

MyApp.fw7 = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto',
  // App routes
  //routes: routes,
});


// Init/Create main view
var mainView = MyApp.fw7.views.create('.view-main', {});

function dialog(params) {
  var dlg = MyApp.fw7.dialog.create({
    title: params.title,
    text: params.text,
    buttons: params.buttons
  });
  dlg.open();
}
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function ($ionicPlatform, $rootScope, $location, $timeout, $ionicHistory, $cordovaToast) {
        $ionicPlatform.ready(function ($rootScope) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        //双击退出
        $ionicPlatform.registerBackButtonAction(function (e) {
            //判断处于哪个页面时双击退出
            if ($location.path() == '/tab/dash') {
                if ($rootScope.backButtonPressedOnceToExit) {
                    ionic.Platform.exitApp();
                } else {
                    $rootScope.backButtonPressedOnceToExit = true;
                    $cordovaToast.showShortTop('再按一次退出系统');
                    setTimeout(function () {
                        $rootScope.backButtonPressedOnceToExit = false;
                    }, 2000);
                }
            }
            else if ($ionicHistory.backView()) {
                $ionicHistory.goBack();
            } else {
                $rootScope.backButtonPressedOnceToExit = true;
                $cordovaToast.showShortTop('再按一次退出系统');
                setTimeout(function () {
                    $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
            }
            e.preventDefault();
            return false;
        }, 101);

         



    })

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.platform.ios.tabs.style('standard');  
  $ionicConfigProvider.platform.ios.tabs.position('bottom');  
  $ionicConfigProvider.platform.android.tabs.style('standard');  
  $ionicConfigProvider.platform.android.tabs.position('standard');  

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');  
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');  

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('222').icon('ion-ios-arrow-thin-left');  
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');  

  $ionicConfigProvider.platform.ios.views.transition('ios');  
  $ionicConfigProvider.platform.android.views.transition('android');  

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller:'tabCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.skillDetail', {
    url: '/skillDetail:id',
    views: {
      'tab-dash': {
        templateUrl: 'templates/skillDetail.html',
        controller: 'skillDetailDashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.me', {
    url: '/me',
    views: {
      'tab-me': {
        templateUrl: 'templates/tab-me.html',
        controller: 'MeCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

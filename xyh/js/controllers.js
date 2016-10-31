angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
   $scope.shouldShowDelete = false;
   $scope.shouldShowReorder = false;
   $scope.listCanSwipe = true;
   $scope.edit=function(){
    alert("无法编辑")
   }

})
.controller('tabCtrl',function($rootScope,$http,$scope){
//$rootScope.skills=[];
//$scope.items = [];
var end = false;
  $scope.loadMore = function() {
    if(end){
       $scope.$broadcast('scroll.infiniteScrollComplete');
      return;
    }
    $http.get('ajax/skill.json').success(function(res) {
        $rootScope.skills = res;
    }).finally(function(){
      $scope.$broadcast('scroll.infiniteScrollComplete');
      end=true;
    })
  };

  /*$scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });*/



   /*$http({
    url:'ajax/skill.json',
    method:'get'
   }).then(function(res){
    $rootScope.skills = res.data;
    console.log(res.data)
   })*/  
})

.controller('ChatsCtrl', function($scope, Chats,$http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $http({
    url:'ajax/project.json',
    method:'get'
  }).then(function(res){
    console.log(res.data);
    $scope.projects = res.data;
  })
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('skillDetailDashCtrl', function($scope,$rootScope, $stateParams,$http) {
  
  console.log($rootScope.skills);
  $scope.sDetailId = $stateParams.id
  console.log($scope.sDetailId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MeCtrl', function($scope,$cordovaActionSheet) {
  var like = ['代码','音乐','运动','游戏']
  $scope.autoplay= true;
  $scope.slideHasChanged=function(i){
    $scope.like = like[i];
  }
    
  $scope.callFriend = function ($event, PhoneNumber) {
     window.open('tel:' + PhoneNumber);
     //获取打电话的时间
     //var time=new Date();
  }

    var options = {
      title: '你好!',
      buttonLabels: ['我是邢延海'],
      addCancelButtonWithLabel: '我知道了',
      androidEnableCancelButton : true,
      winphoneEnableCancelButton : true,
      //addDestructiveButtonWithLabel : '删除'
    };


    document.addEventListener("deviceready", function () {
      $cordovaActionSheet.show(options)
        .then(function(btnIndex) {
          var index = btnIndex;
          //alert(index);
        });
    }, false);


  
  
})
.directive("compile", function($compile) {
      return function(scope,element,attrs){
        scope.$watch(
          function(scope){
            return scope.$eval(attrs.compile);
          },
          function(value){
            element.html(value);
            $compile(element.contents())(scope);
          }
        )
      }
    })

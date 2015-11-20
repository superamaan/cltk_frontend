if (Meteor.isClient){
/*
 * The primary client-side angular application
 *
 * Definition and routes
 *
 */
(function($){


  angular.module( 'app', [ 'angular-meteor', 'ngMaterial' ] );

  angular.module('app')
  	.controller('AppController', ['$scope', '$meteor', '$http', function($scope, $mdSidenav, $meteor, $http) {

    	window.__ad__ = window.__ad__ || {};
    	var Ad = window.__ad__
    	;

      /*
       * Initialize lifecycle of the controller
       */
  		$scope.initialize = function() {

        setTimeout(function(){
          var elem = document.querySelector('header');
          var headroom = new Headroom(elem);
          headroom.init();

        }, 300);


  		};

      // Initialize collapse button


      /*
       * Update lifecycle of the controller
       */
  		$scope.update = function() {

  		};

    //  $scope.openLeftMenu = function() {
    //    $mdSidenav('left').toggle();
    //  };


      angular.element(document).ready(function () {
        $scope.initialize();



      });



  }]); // end controller

})(jQuery)

}// Meteor.isClient

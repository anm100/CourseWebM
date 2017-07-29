var app = angular.module('myAPP', ['ngRoute']);

    app.config(function ($routeProvider) {

      
        $routeProvider
            .when('/', {
                templateUrl: 'mycourses.aspx'
            })
            .when('/Courses', {
                templateUrl: 'mycourses.aspx',
                controller  : 'courseController'
            }).when('/Assignment', {
                templateUrl: 'showAssignment.aspx',
                controller: 'AssignmentController'
            }).when('/grades', {
                templateUrl: 'gradesLab.aspx'
            });


    }).controller('courseController', function ($scope, $http, $log, $rootScope) {

        $http({
            method: 'GET',
            url: '/WebService.asmx/GetCourses'
        })
            .then(function (data) {
                var response = angular.fromJson(data);
                $rootScope.courses = JSON.parse(response.data);
                alert(response.data);
                })
        })
        .controller('AssignmentController', function ($scope, $location, $http, $log, $rootScope) {
            alert($location.search().id);
        })
   .controller('MyController', function ($scope, $http, $log, $rootScope) {
     
        $http({
            method: 'GET',
            url: '/WebService.asmx/GetAssigmnetUsersCourse'
        }) 
            .then(function (data) {
                var response = angular.fromJson(data);
                $rootScope.students = JSON.parse(response.data);
                alert(response.data);
            })
    })

    .controller('MyController1', function ($scope, $http, $log, $rootScope, $http, $window) {
        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.searchFish = '';     // set the default search/filter 
        // backup for $scope.sushi
        //$scope.Users = $rootScope.Users
        //$log.info($rootScope.Users);
        // $scope.UseresBack = angular.copy($scope.Users);
        $log.info($scope.students);
        $log.info($rootScope.students);
        $scope.save = function () {
            $scope.UseresBack = angular.copy($scope.students);
            $log.info($scope.students);
            $("tbody td").css("color", "black");
            var post = $http({
                method: "POST",
                url: "/WebService.asmx/PostDataResponse",
                dataType: 'json',
                data: JSON.stringify({ name: JSON.stringify( $scope.students)}),
                headers: { "Content-Type": "application/json" }
            });

            post.success(function (data, status) {
                $window.alert(data.d);
            });

            post.error(function (data, status) {
                $window.alert(data.Message);
            });
        }
        $scope.reset = function () {
            $scope.students = angular.copy($scope.UseresBack);
            $("tbody td").css("color", "black");
        }

        $scope.$watch('students', function (newVal, oldVal) {
            $(event.target).parent().css("color", "red");
        }, true);
    })

/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("HomeController",
    [
        "$scope",
        "weatherService",
        "Hub",
        "$rootScope",
        "$timeout",
        function ($scope, weatherService, Hub, $rootScope, $timeout) {
            $scope.title = "Weather Reports";

            $scope.weather = [];



            weatherService.GetAllWeatherReport()
                .then(function (data) {
                    if (data != null) {
                        $scope.weather = data;
                        //console.log($scope.weather);
                    }

                });



            // API Länk för signalR
            var path = 'http://localhost:14023/signalr';

            // API HUB
            var hub = new Hub('TemperatureHub', {

                rootPath: path,

                listeners: {
                    'reciveTemperature': function (temperature) {
                        var index = $scope.weather.map(function (temperature) {
                            return temperature.Id;
                        }).indexOf(temperature.Id);
                        $scope.weather[index].CityTemperature = temperature.CityTemperature;
                        $rootScope.$apply();
                        //$scope.$apply(function () {
                        //    $scope.weather.push(temperature);
                        //});
                        //$scope.weather = temperature;
                        //$rootScope.$apply();
                        console.log('recieved: ' + temperature.CityTemperature);
                        console.log('recieved: ' + temperature);
                    }

                },

                //Kollar alla kontakt errors
                errorHandler: function (error) {
                    console.error(error);
                },
                stateChanged: function (state) {
                    switch (state.newState) {
                        case $.signalR.connectionState.connecting:
                            console.log("signalR.connectionState.connecting" + state.newState);
                            //your code here
                            break;
                        case $.signalR.connectionState.connected:
                            console.log("signalR.connectionState.connected" + state.newState);
                            //your code here
                            break;
                        case $.signalR.connectionState.reconnecting:
                            console.log("signalR.connectionState.reconnecting" + state.newState);
                            //your code here
                            break;
                        case $.signalR.connectionState.disconnected:
                            console.log("signalR.connectionState.disconnected" + state.newState);
                            //your code here
                            break;
                    }
                }

            });

        }
    ]);
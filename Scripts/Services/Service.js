/// <reference path="../angular.js" />
angular.module("mainModule")
    .service("weatherService", [
        "$http",
        "$q",

        function ($http, $q) {

            var reports = "http://localhost:14023/api/TemperaturesApi/";


            this.GetAllWeatherReport = function () {
                var deferred = $q.defer();

                $http.get(reports)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function () {

                        deferred.resolve([]);
                    });

                return deferred.promise;
            };



        }


    ]);
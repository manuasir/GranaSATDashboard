app.directive('passesRegistration', function($http, $document) {
    function link(scope, element, attrs) {
        scope.satelliteSelected = ""

        scope.$watch("logged", function(newValue, oldValue) {
            if (newValue == true) {
                scope.getSatellites().then(function(res){
                    scope.availableSatellites = res.data
                    scope.satelliteSelected = scope.availableSatellites[0]
                    // scope.$watch("satelliteSelected", function() {})
                    scope.getPasses()
                })
            }
        });

        scope.getPasses = function() {
            scope.satellitePasses = []
            $http({
                method: 'GET',
                url: "satellites/passes",
                params: {
                    satellite: scope.satelliteSelected.RMT_NAME
                }
            }).then(function(res) {
                scope.satellitePasses = res.data
            });
        }

        scope.setPass = function(pass) {
            $http({
                method: 'POST',
                url: "satellites/passes",
                data: {
                    satellite: scope.satelliteSelected.RMT_NAME,
                    pass: pass
                }
            }).then(function(res) {
                // console.log(res);
            });
        }

        setInterval(function() {
            scope.getScheduledPasses().then(function(res) {
                res.data.forEach(function(e) {
                    e.remainTime = new Date(e.startDateUTC) - new Date()
                })
                scope.scheduledPasses = res.data
            });
        }, 1000);
    }
    return {
        link: link,
        templateUrl: 'directives/passesRegistration/passesRegistration.html',
    };
});

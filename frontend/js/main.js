
(function(window){

    var searchController = function ($scope, $http) {

        $scope.leftResult = [];
        $scope.rightResult = [];

        $scope.isRequesting = false;


        $scope.search = function() {

            var term = $scope.searchTerm;

            if (term && term.length > 0) {

                $scope.isRequesting = true;
                $scope.leftResult = [];
                $scope.rightResult = [];



                $http.get(window.Worderer.url + encodeURI(term))
                .success(function(data) {
                    $scope.isRequesting = false;
                    handleResponse(data);
                }).error(function(data, status, headers, config) {
                    $scope.isRequesting = false;
                    console.log("Error");
                });

            }
        };

        $scope.searchClick = function(term) {
            $scope.searchTerm = term;
            $scope.search();    
        }

        function handleResponse(result) {
            for (var i = 0; i < result.length; i++) {
                if (i%2 === 0) {
                    $scope.leftResult.push(result[i].phrase);
                } else {
                    $scope.rightResult.push(result[i].phrase);
                }
            }
        }
    }

    // Register globally accessible function/variables
    window.SearchCtrl = searchController;

}(window));


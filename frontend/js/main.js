
function SearchCtrl ($scope) {

    $scope.leftResult = [];
    $scope.rightResult = [];


    $scope.search = function() {

        var term = $scope.searchTerm;

        if (term && term.length > 0) {

            $scope.leftResult = [];
            $scope.rightResult = [];

            $.getJSON("http://192.168.1.3:8080/backend/search/" + encodeURI(term), 
                function(result) {
                    $scope.$apply(function(){
                        for (var i = 0; i < result.length; i++) {
                            if (i%2 === 0) {
                                console.log(result[i].phrase);
                                $scope.leftResult.push(result[i].phrase);
                            } else {
                                console.log(result[i].phrase);
                                $scope.rightResult.push(result[i].phrase);
                            }
                        }
                    });
                }
            );
        }
    };



}
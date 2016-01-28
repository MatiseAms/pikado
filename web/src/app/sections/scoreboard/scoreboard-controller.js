angular.module('Pikado')
	.controller('ScoreboardController', ['$scope', '$stateParams', function($scope, $stateParams) {
		'use strict';

		var self = this;

		angular.extend($scope, {
			challenger: {
				id: "",
				name: "",
				scores: []
			},
			challenged: {
				id: "",
				name: "",
				scores: []
			},
			eyes: 'eyesLeft'
		});



		var Game = Parse.Object.extend("Game");
		var query = new Parse.Query(Game);

		query.get($stateParams.id).then(function(game){
			var Score = Parse.Object.extend("Score");
			var query = new Parse.Query(Score);

			query.equalTo("game", game);
			query.ascending("createdAt");
			query.include("game");
			query.include("user");
			query.find().then(function(results){
				for(var i=0; i<results.length; i++){
					if(i===0){
						// setup base
						$scope.challenger.id = results[i].get("game").get("challenger").id;
						$scope.challenger.name = results[i].get("game").get("challenger").get("firstName");

						$scope.challenged.id = results[i].get("game").get("challenged").id;
						$scope.challenged.name = results[i].get("game").get("challenged").get("firstName");
					}
					if(results[i].get("user").id===$scope.challenger.id){
						$scope.challenger.scores.push({remaining: results[i].get("remaining"), score: results[i].get("score")});
					}else if(results[i].get("user").id===$scope.challenged.id){
						$scope.challenged.scores.push({remaining: results[i].get("remaining"), score: results[i].get("score")});
					}

				}
				if($scope.challenger.scores.length>$scope.challenged.scores.length){
					// $scope.challenger.scores.length;
				}
				$scope.$applyAsync();
			});

		},function(error){
			console.log(error);
		});




	}]);

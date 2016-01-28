/* global Parse */
angular.module('Pikado')
	.service('ParseService', ['$q', '$window', function($q, $window) {
		'use strict';

		var self = this;

		self.initialize = function() {
			// prod app
			Parse.initialize("Osy03fANgKzEjZvux7fjxNIgxC4QzrE3syBIF9Ir", "IqjZ1u1cLpdQFe6sJuyzZdGq85H7yaXD1cw5GRRL");

		};

	}]);

module.exports = {
	dev: {
		dest: '<%= config.src.vendor %>',
		options: {
			keepExpandedHierarchy: false,
			ignorePackages: [
				'what-input'
			],
			packageSpecific: {
				'foundation-sites': {
					dest: '<%= config.src.vendor %>/foundation',
					stripGlobBase: true,
					keepExpandedHierarchy: true,
					files: [
						"scss/**"
					]
				},
				'angular': {
					files: [
						'angular.js'
					]
				},
				'angular-ui-router': {
					files: [
						'release/angular-ui-router.js'
					]
				},
				'jquery': {
					files: [
						'dist/jquery.js'
					]
				},
				'modernizr': {
					files: [
						'modernizr.js'
					]
				},
				'parse': {
					files: [
						'parse.js'
					]
				}
			}
		}
	}
};

module.exports = {
	options: {
		jshintrc: true,
		reporter: require('jshint-stylish')
	},

	// Check grunt configuration
	grunt: ['Gruntfile.js', 'grunt/**/*.js'],

	// Check app
	src: {
		files: [{
			expand: true,
			cwd: '<%= config.src.app %>',
			src: '**/*.js'
		}]
	}
};

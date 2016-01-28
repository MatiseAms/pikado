module.exports = {
	options: {
		spawn: false
	},
	scripts: {
		files: [
			'<%= config.src.app %>**/*.js'
		],
		tasks: [
			'jshint:src',
			'concat:scripts',
			'ngtemplates:dev'
		]
	},
	html: {
		files: '<%= config.src.app %>*.html',
		tasks: [
			'copy:html',
			'htmlbuild:dev'
		]
	},
	htmlPartials: {
		files: [
			'<%= config.src.app %>**/*.html',
			'!<%= config.src.app %>*.html'
		],
		tasks: [
			'concat:scripts',
			'ngtemplates:dev'
		]
	},
	images: {
		files: '<%= config.src.app %>img/*',
		tasks: ['copy:images']
	},
	fonts: {
		files: '<%= config.src.app %>fonts/*',
		tasks: ['copy:fonts']
	},
	scss: {
		files:  [
			'<%= config.src.app %>scss/*',
			'<%= config.src.app %>scss/**/*'
		],
		tasks: ['sass','postcss']
	}
};

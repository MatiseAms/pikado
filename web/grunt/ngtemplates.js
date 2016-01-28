module.exports = {
	dev: {
		options: {
			append: true,
			module: 'Pikado'
		},
		cwd: '<%= config.src.app %>',
		src: [
			'**/*.html',
			'!*.html'
		],
		dest: '<%= config.dist.root %>Pikado.js'
	},
	dist: {
		options: {
			append: true,
			module: 'Pikado',
			htmlmin: {
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true
			}
		},
		cwd: '<%= config.src.app %>',
		src: [
			'**/*.html',
			'!*.html'
		],
		dest: '<%= config.dist.root %>Pikado.js'
	}
};

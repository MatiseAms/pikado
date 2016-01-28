module.exports = {
	dist: {
		options: {
			includePaths: ['<%= config.src.vendor %>'],
			sourcemap: false
		},
		files: {
			'<%= config.dist.root %>css/app.css': '<%= config.src.app %>scss/app.scss'
		},
	}
};

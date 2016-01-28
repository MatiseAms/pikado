module.exports = {
	dev: {
		src: '<%= config.src.app %>index.html',
		dest: '<%= config.dist.root %>'
    },
	dist: {
		src: '<%= config.src.app %>index.html',
		dest: '<%= config.dist.root %>'
	},
	staging: {
		src: '<%= config.src.app %>index.html',
		dest: '<%= config.dist.root %>'
	}
};
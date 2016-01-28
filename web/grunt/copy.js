module.exports = {
	html: {
		files: [{
			expand: true,
			cwd: '<%= config.src.app %>',
			src: [
				'*.html'
			],
			dest: '<%= config.dist.root %>'
		}]
	},
	images: {
		files: [{
			expand: true,
			cwd: '<%= config.src.app %>img/',
			src: [
				'*.jpg',
				'*.jpeg',
				'*.png',
				'*.gif',
				'*.svg',
				'*.ico'
			],
			dest: '<%= config.dist.root %>img/'
		}]
	},
	fonts: {
		files: [{
			expand: true,
			cwd: '<%= config.src.app %>fonts/',
			src: [
				'*.eot',
				'*.ttf',
				'*.otf',
				'*.svg',
				'*.woff'
			],
			dest: '<%= config.dist.root %>fonts/'
		}]
	},
	vendor: {
		files: [{
			expand: true,
			cwd: '<%= config.src.vendor %>',
			src: [
				'*.js',
				'!*.min.js',
				'*/*.js'
			],
			dest: '<%= config.dist.vendor %>'
		}]
	}
};

module.exports = {
	options: {
		config: 'grunt/config/csscomb.json'
	},
	cssmagic: {
		expand: true,
		cwd: 'src/app/scss/',
		src: ['*.scss'],
		dest: 'src/app/scss/',
		ext: '.scss'
	}
};

module.exports = {
	options: {
		map: true,
		verbose: true,
		processors: [
			require('postcss-assets')({ loadPaths: ['./dist/img/'] }),
			require('autoprefixer')({ browsers: ['last 2 versions'] }),
		//	require('postcss-sprites')({stylesheetPath: './dist/css', spritePath: './dist/img/sprite.png', retina: true}),
			require('postcss-svg')({ paths: ['dist/img/svg/'] }),
			require('postcss-size')({}),
			require('postcss-alias')({}),
			require('postcss-center')({}),
			//require('postcss-verthorz')({}), ERROR!!!
			require('postcss-vmin')({}),
			require('postcss-custom-selectors')(),
			require('css-byebye')({ rulesToRemove: [''], map: false })
		]
	},
	dist: { src: '<%= config.dist.root %>css/app.css' }
};

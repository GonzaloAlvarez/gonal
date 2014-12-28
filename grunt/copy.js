// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
	fontawesome: {
		expand: true,
		flatten: true,
		src: ['bower_components/fontawesome/fonts/*'],
		dest: 'build/live/fonts/'
	},
	opensans: {
		expand: true,
		flatten: false,
		cwd: 'bower_components/open-sans-fontface/fonts',
		src: ['**'],
		dest: 'build/live/fonts/'
	},
	statics: {
		expand: true,
		flatten: false,
		cwd: 'static',
		src: ['**'],
		dest: 'build/live/'
	},
	styles_home: {
		src: 'build/css/styles.css',
		dest: 'build/live/css/styles.css'
	},
	styles_blog: {
		src: 'build/css/blog.css',
		dest: 'build/live/b/css/styles.css'
	}
};

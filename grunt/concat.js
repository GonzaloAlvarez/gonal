// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
	home: {
		src: '<%= home.js %>',
		dest: 'build/live/js/scripts.js'
	},
	blog: {
		src: '<%= blog.js %>',
		dest: 'build/live/b/js/scripts.js'
	}
};

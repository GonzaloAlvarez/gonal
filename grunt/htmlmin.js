// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
	home: {
		options: {
			removeComments: true,
			collapseWhitespace: true
		},
		files: {'build/live/index.html': 'build/live/*.html'}
	}
}

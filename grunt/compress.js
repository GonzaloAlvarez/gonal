// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
	prod: {
		options: {
			mode: 'gzip'
		},
		expand: true,
		cwd: 'build/live/',
		src:['**/*'],
		dest: 'build/deploy/'
	}
}

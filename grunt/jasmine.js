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
			vendor: [
				'bower_components/jquery/dist/jquery.js',
				'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
			],
			specs: 'home/js/parse.spec.js',
		},
		src: ['home/js/parse.js']
	}
};

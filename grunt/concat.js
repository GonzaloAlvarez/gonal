// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
	js: {
		src: [
			"bower_components/jquery/dist/jquery.js",
			"bower_components/jquery-form-validator/form-validator/jquery.form-validator.js",
			"build/js/analytics.js",
			"home/js/parse-1.3.1.js",
			"home/js/parse.js",
			"home/js/abtests.js",
			"home/js/ga.js",
			"home/js/nav.js",
			"home/js/form.js"
		],
		dest: 'build/live/js/scripts.js'
	}
}

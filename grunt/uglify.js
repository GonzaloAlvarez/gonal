// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
	all: {
		files: {
			"build/live/js/scripts.js": [ 
				"bower_components/jquery/dist/jquery.js",
				"bower_components/jquery-form-validator/form-validator/jquery.form-validator.js",
				"build/js/analytics.js",
				"src/js/parse-1.3.1.js",
				"src/js/ga.js",
				"src/js/form.js"
			]
		},
		options: {
			preserveComments: false,
			report: "min",
			beautify: {
				"ascii_only": true
			},
			compress: {
				"hoist_funs": false,
			    loops: false,
				unused: false
			}
		}
	}
}

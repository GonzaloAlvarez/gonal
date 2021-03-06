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
			"build/live/js/scripts.js": ['<%= home.js %>'],
            "build/live/b/assets/js/scripts.js": ['<%= blog.js %>']
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
};

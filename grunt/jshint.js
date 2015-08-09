// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
    options: {
      curly: true,
      eqeqeq: true,
      eqnull: true,
      browser: true,
      globals: {
    		jQuery: true
    	},
    },
	all: {
		files: {
			src: ['{<%= files.js.home %>}', '{<%= files.js.engine %>}', '{<%= files.js.blog %>}', '!js/common/ga.js']
		}
	}
};

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
			sassDir: 'sass',
			cssDir: 'build/css',
			specify: 'sass/styles.scss'
		}
	},
    blog: {
        options: {
            sassDir: 'sass/blog',
            cssDir: 'build/blog/themes/gonal/source/assets/css',
            specify: 'sass/blog/styles.scss'
        }
    }
};

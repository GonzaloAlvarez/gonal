// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
	options: {
		flatten: true,
		data: ['src/data/**/*.{json,yml}'],
		helpers: ['handlebars-helper-md'],
		partials: ['src/partials/**/*.hbs', 'src/content/*.md']
	},
	home: {
		src: ['src/home.hbs'],
		dest: 'build/live/index.html'
	}
}

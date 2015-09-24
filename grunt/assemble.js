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
            flatten: true,
            data: ['home/data/**/*.{json,yml}'],
            helpers: ['handlebars-helper-md'],
            partials: ['home/partials/**/*.hbs', 'home/content/*.md']
        },
		src: ['home/index.hbs'],
		dest: 'build/live/index.html'
	},
    report: {
        options: {
            flatten: true
        },
        src: ['grunt/reports/result.hbs'],
        dest: 'build/report.html'
    }
};

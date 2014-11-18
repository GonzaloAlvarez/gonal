// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
	options: {
		url: 'https://gon.al',
		locale: "en_GB",
		nokey: true
	},
	desktop: {
		options: {
			strategy: 'desktop'
		}
	},
	mobile: {
		options: {
			strategy: 'mobile'
		}
	}
}

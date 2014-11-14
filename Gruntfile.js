// Gruntfile GonAl project
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

module.exports = function(grunt) {
	require('load-grunt-config')(grunt, {
		loadGruntTasks: {
			pattern: ['grunt-*','assemble']
		},
		data: {
			pkg: grunt.file.readJSON('package.json'),
			aws: grunt.file.readJSON('aws-s3.json'),
			cf: grunt.file.readJSON('cloudflare.json')
		}
	});
}

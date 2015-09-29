// JS GonAl project - Grunt Log task
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var logfile = require('logfile-grunt');

module.exports = function(grunt) {
    grunt.registerMultiTask('gruntlog', 'Log everything from here', function() {
        logfile(grunt, { filePath: this.data.dest });
    });
};

module.exports = function(grunt) {
    grunt.registerMultiTask('jasmineinteg', 'Log stuff.', function() {
        grunt.log.writeln('This is a test');
    });
};

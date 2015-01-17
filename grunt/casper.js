// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
    options: {
        verbose: true,
        test: true,
        args: ['--basepath=' + __dirname + '/../build/live'],
        engine: 'phantomjs'
    },
    home: {
        src: ['js/tests/home.casper.js']
    }
};

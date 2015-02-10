// JS GonAl project - Phantom screenshot task
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var phantom = require('phantom');
var phantomjs = require('phantomjs');
var path = require('path');
var phantom_options = {
	path: path.dirname(phantomjs.path) + '/'
};

module.exports = function(grunt) {
	grunt.registerMultiTask('screenshot', 'Creates a PhantomJS screenshot.', function() {
		var done = this.async();
		var screenshotPath = path.join(process.cwd(), this.file.dest);
		var srcUrl = 'file://' + path.join(process.cwd(), this.file.src);
		var srcWidth = this.data.width;
		var srcHeight = this.data.height;
		phantom.create(function(ph) {
		ph.createPage(function(page) {
			page.set('viewportSize', {
					width: srcWidth,
					height: srcHeight
				});
				page.open(srcUrl,function(status) {
					setTimeout(function() {
						page.render(screenshotPath, {format:'png'}, function(err){done(true);});
					}, 200);
				});
			});
		}, phantom_options);
	});
};

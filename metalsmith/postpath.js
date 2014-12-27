// JS GonAl project - MetalSmith postpath module
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var path = require('path');

module.exports = plugin;

function plugin(opts) {
	return function(files, ms, done) {
		setImmediate(done);
		Object.keys(files).forEach(function (file) {
			if(!(/.html/.test(path.extname(file)))) return;
			var data = files[file];
			data.path = path.join(path.dirname(file), path.basename(file));
			data.rootpath = path.dirname(file).replace(/[^\/]*/g,'.');
		});
	};
}



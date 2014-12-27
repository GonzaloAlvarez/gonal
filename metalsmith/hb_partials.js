// JS GonAl project - MetalSmith Handlebars partials
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var _ = require('lodash'),
	Handlebars = require('handlebars'),
	fs = require('fs');

module.exports = plugin;

function plugin(opts) {
	if('string' == typeof opts) opts = [opts];
	if(opts instanceof Array) opts= { partials: opts };
	opts = opts || {};
	var partials = opts.partials || [];
	return function(files, ms, done) {
		setImmediate(done);
		_.each(partials, function(folder) {
			_.each(fs.readdirSync(folder),function(file){
				var name = file.split(".")[0],
					contents = fs.readFileSync(ms._directory+"/"+folder+"/"+file).toString();
				Handlebars.registerPartial(name,contents);
			});
		});
	};
}



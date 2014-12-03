// Metalsmith Build File GonAl project
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var Metalsmith = require('metalsmith'),
	templates = require('metalsmith-templates'),
	ignore = require('metalsmith-ignore'),
	markdown = require('metalsmith-markdown'),
	collections = require('metalsmith-collections'),
	Handlebars = require('handlebars'),
	path = require('metalsmith-path'),
	_ = require('lodash'),
	moment = require('moment'),
	fs = require('fs');

var partials_folders = ['home/partials/common', 'blog/templates/partials'];

_.each(partials_folders, function(folder) {
	_.each(fs.readdirSync(folder),function(file){
		var name = file.split(".")[0],
			contents = fs.readFileSync(__dirname+"/"+folder+"/"+file).toString();
		Handlebars.registerPartial(name,contents);
	});
});

Handlebars.registerHelper('debug', function(optVal) {
	console.log(this);
	if(optVal) {
		console.log(optVal);
	}
});

Handlebars.registerHelper('moment', function(time,format){
	  return moment(time).format(format);
});

Metalsmith(__dirname)
	.source('blog')
	.destination('build/live/b')
	.use(collections({
		posts: {
			pattern: 'posts/**/*',
			sortBy: 'date',
			reverse: true
		}})
	)
	.use(markdown())
	.use(path())
	.use(templates({
		engine: 'handlebars',
		directory: 'blog/templates'
	}))
	.use(ignore([
		'templates/**'
	]))
	.build(function(err) { if(err) throw err; });

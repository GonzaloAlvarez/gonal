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
	_ = require('lodash'),
	fs = require('fs');

_.each(fs.readdirSync('blog/templates/partials'),function(file){
	  var name = file.split(".")[0],
	      contents = fs.readFileSync(__dirname+"/blog/templates/partials/"+file).toString();
  Handlebars.registerPartial(name,contents);
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
	.use(templates({
		engine: 'handlebars',
		directory: 'blog/templates'
	}))
	.use(ignore([
		'templates/**'
	]))
	.build(function(err) { if(err) throw err; });

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
	path = require('path'),
	postpath = require('./metalsmith/postpath'),
	hb_partials = require('./metalsmith/hb_partials'),
	moment = require('moment'),
	fs = require('fs');

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
	.use(hb_partials(['home/partials/common', 'blog/templates/partials']))
	.use(markdown())
	.use(postpath())
	.use(templates({
		engine: 'handlebars',
		directory: 'blog/templates'
	}))
	.use(ignore([
		'templates/**'
	]))
	.build(function(err) { if(err) throw err; });

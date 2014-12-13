var phantom = require('phantom');
var phantomjs = require('phantomjs');
var path = require('path');

var phantom_options = {
	path: path.dirname(phantomjs.path) + '/'
}

var args = process.argv.slice(2);

phantom.create(function(ph) {
	ph.createPage(function(page) {
		var url = 'file://' + __dirname + '/build/live/index.html';
		page.open(url, function(status) {
			if(status !== 'success') {
				console.log('Failed loading site');
			} else {
				page.onConsoleMessage(function(msg) {
					if(msg === 'AD') {
						ph.exit();
					} else {
						console.log(msg);
					}
				});
				setTimeout(function() {
					if(args[0] === 'screenshot') {
						page.render('sm.png', {format:'png'}, function(err) { ph.exit();});
					}
					else if(args[0] === 'jasmine') {
						page.injectJs('bower_components/es5-shim/es5-shim.js');
						page.injectJs('bower_components/jasmine/lib/jasmine-core/jasmine.js');
						page.injectJs('bower_components/jasmine/lib/jasmine-core/jasmine-html.js');
						page.injectJs('bower_components/jasmine/lib/jasmine-core/boot.js');
						page.injectJs('bower_components/jasmine/lib/jasmine-core/json2.js');
						page.injectJs('bower_components/jasmine-reporters/src/terminal_reporter.js');
						page.injectJs('bower_components/jasmine-jquery/lib/jasmine-jquery.js');
						page.injectJs('home/js/main.spec.js');

						page.evaluate(function(result) {
							jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
								color: true,
								verbosity: 3
							}));
							jasmine.getEnv().addReporter({jasmineDone: function() {console.log('AD')}});
							setTimeout(function() {
								var evt = document.createEvent('Event'); 
								evt.initEvent('load', false, false);
								window.dispatchEvent(evt);
							}, 500);
						});
					}
				}, 200);
			}
		});
	});
}, phantom_options);


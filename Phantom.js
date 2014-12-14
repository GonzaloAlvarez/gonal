var phantom = require('phantom');
var phantomjs = require('phantomjs');
var path = require('path');

var failed_on_exit = false;

var phantom_options = {
	path: path.dirname(phantomjs.path) + '/',
	onExit: function() {
		if(failed_on_exit) {
			process.exit(1);
		} else {
			process.exit(0);
		}
	}
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
					} else if(msg == 'AF') {
						failed_on_exit = true;
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
						page.injectJs('bower_components/jasmine/lib/jasmine-core/jasmine.js');
						page.injectJs('bower_components/jasmine/lib/jasmine-core/jasmine-html.js');
						page.injectJs('bower_components/jasmine/lib/jasmine-core/boot.js');
						page.injectJs('bower_components/jasmine/lib/jasmine-core/json2.js');
						page.injectJs('bower_components/jasmine-reporters/src/terminal_reporter.js');
						page.injectJs('bower_components/jasmine-jquery/lib/jasmine-jquery.js');
						page.injectJs('home/js/main.spec.js');

						var passed = page.evaluate(function(result) {
							jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
								color: true,
								verbosity: 3
							}));
							jasmine.getEnv().addReporter({
								jasmineStarted: function() { jasmine.getEnv().failedTests = false;},
								specDone: function(spec) { if(spec.status === 'failed'){ jasmine.getEnv().failedTests = true;}},
								jasmineDone: function() { 
									if(jasmine.getEnv().failedTests) { 
										console.log('AF');
									} else {
										console.log('AD');
									}
								}
							});
							setTimeout(function() {
								var evt = document.createEvent('Event'); 
								evt.initEvent('load', false, false);
								window.dispatchEvent(evt);
							}, 200);
						});
					}
				}, 200);
			}
		});
	});
}, phantom_options);


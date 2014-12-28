var phantom = require('phantom');
var phantomjs = require('phantomjs');
var path = require('path');

var failed_on_exit = false;
var tests_started = false;
var preinit_messages = [];

var phantom_options = {
	path: path.dirname(phantomjs.path) + '/',
	onExit: function() {
		if(failed_on_exit) {
			process.exit(1);
		} else {
			process.exit(0);
		}
	}
};

var CONSTANTS = {
	'INIT_TESTS': '__INIT_TESTS__**',
	'END_TESTS_OK': '__END_TESTS_OK_**',
	'END_TESTS_FAIL': '__END_TESTS_FAIL_**'
};

var args = process.argv.slice(2);

phantom.create(function(ph) {
	ph.createPage(function(page) {
		var url = 'file://' + __dirname + '/build/live/index.html';
		page.set('viewportSize', {
			width: 2000,
			height: 1000
		});
		page.set('onError', function(msg, trace) {
			console.log('FAILURE: ' + msg);
			failed_on_exit = true;
			ph.exit();
		});
		page.onConsoleMessage(function(msg) {
			if(msg === CONSTANTS.END_TESTS_OK) {
				ph.exit();
			} else if(msg === CONSTANTS.END_TESTS_FAIL) {
				failed_on_exit = true;
				ph.exit();
			} else if(msg === CONSTANTS.INIT_TESTS) {
				if(preinit_messages.length > 0) {
					console.error('FAILURE: There are messages queued comming from the application.');
					preinit_messages.forEach(function(m) {
						console.error('> ' + m);
					});
					failed_on_exit = true;
					ph.exit();
				}
				tests_started = true;
			} else {
				if(tests_started === true) {
					if(failed_on_exit === false) {
						console.log(msg);
					}
				} else {
					preinit_messages.push(msg);
				}
			}
		});
		page.open(url, function(status) {
			if(status !== 'success') {
				console.log('Failed loading site');
			} else {
				setTimeout(function() {
					if(args[0] === 'screenshot') {
						page.render('build/live/screenshot.png', {format:'png'}, function(err) { ph.exit();});
					}
					else if(args[0] === 'jasmine') {
						page.injectJs('bower_components/jasmine/lib/jasmine-core/jasmine.js');
						page.injectJs('bower_components/jasmine/lib/jasmine-core/jasmine-html.js');
						page.injectJs('bower_components/jasmine/lib/jasmine-core/boot.js');
						page.injectJs('bower_components/jasmine/lib/jasmine-core/json2.js');
						page.injectJs('bower_components/jasmine-reporters/src/terminal_reporter.js');
						page.injectJs('bower_components/jasmine-jquery/lib/jasmine-jquery.js');
						page.injectJs('home/js/main.spec.js');

						page.evaluate(function(c) {
							jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
								color: true,
								verbosity: 3
							}));
							var CONSTANTS = JSON.parse(c);
							jasmine.getEnv().addReporter({
								jasmineStarted: function() { jasmine.getEnv().failedTests = false;},
								specDone: function(spec) { if(spec.status === 'failed'){ jasmine.getEnv().failedTests = true;}},
								jasmineDone: function() { 
									if(jasmine.getEnv().failedTests) { 
										console.log(CONSTANTS.END_TESTS_FAIL);
									} else {
										console.log(CONSTANTS.END_TESTS_OK);
									}
								}
							});
							setTimeout(function() {
								console.log(CONSTANTS.INIT_TESTS);
								var evt = document.createEvent('Event'); 
								evt.initEvent('load', false, false);
								window.dispatchEvent(evt);
							}, 200);
						}, null, JSON.stringify(CONSTANTS));
					}
				}, 200);
			}
		});
	});
}, phantom_options);


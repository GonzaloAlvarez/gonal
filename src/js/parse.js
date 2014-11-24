// JS GonAl project - Parse Initialization
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var gaParse = function() {
	var parseAPPID = 'jWGufLAHzOWI3YZvK6XtTPOkeVb6vTLvtdTokslZ';
	var parseJSID = 'MEcv6Rdtj6MW7CxSIlC4ZerblfulEU4cZogsxN0n';
	var isInitialized = false;

	return {
		init: function() {
			if(! isInitialized ) {
				Parse.initialize(parseAPPID, parseJSID);
				isInitialized = true;
			}
		}
	};

}();


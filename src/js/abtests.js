// JS GonAl project - A/B Testing Environment
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var abTests = function() {

	gaParse.init();

	var getURLParameter = function(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	};

	return {
		isInControl: function(experiment) {
			if(getURLParameter(experiment) === '1') {
				return false;
			}
			return true;
		},
		isInTreatment: function(experiment) {
			if(getURLParameter(experiment) === '1') {
				return true;
			}
			return false;
		}
	};
}();

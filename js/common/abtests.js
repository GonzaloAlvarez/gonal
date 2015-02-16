// JS GonAl project - A/B Testing Environment
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var abTests = function() {

	gaParse.init();

    var ABTests = Parse.Object.extend("ABTests");

	var getURLParameter = function(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	};

    var getParseTreatment = function(name, promise) {
        var query = new Parse.Query(ABTests);
        query.equalTo("Name", name);
        query.first({
            success: function(result) {
                promise.resolve(result.get('Treatment'));
            },
            error: function(msg) {
                promise.resolve('C');
            }
        });
    };

	return {
		getTreatment: function(experiment) {
            var deferred = $.Deferred();
			if(getURLParameter(experiment) === '1') {
				deferred.resolve('T1');
			} else {
                getParseTreatment(experiment, deferred);
            }
            return deferred;
		}
	};
}();

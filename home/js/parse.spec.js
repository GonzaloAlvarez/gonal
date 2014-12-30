// JS GonAl project - Parse Initialization Spec
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

describe('Parse Initialization Environment', function() {
    window.Parse = {};
    beforeEach(function() {
        Parse.initialize = function() {};
        spyOn(Parse, 'initialize');
    });

    it('should call initialize for the Parse system', function() {
        gaParse.init();
        expect(Parse.initialize).toHaveBeenCalled();
    });
});

// JS GonAl project - Browser Capabilities
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var browserCapabilities = function() {
	var _discriminatorDivId = "_div_desktop_mobile_discriminator";
	$(document.body).append('<div id="' + _discriminatorDivId + '" class="small_only"></div>');
	var $discriminatorDiv = $('#' + _discriminatorDivId);
	var _isDesktopDevice = ($discriminatorDiv.css('display') === 'none');

	return {
		isSmallDevice: function() {
			return !_isDesktopDevice;
		},
        isDesktop: function() {
            return _isDesktopDevice;
        }
	};
}();

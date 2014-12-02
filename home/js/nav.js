// JS GonAl project - Navigation Management
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var gaNav = function() {

	var $gototop = $('#gototop');
	var $all = $('body,html');
	var $win = $(window);

	var upShowLimit = 200;
	var upAnimationSpeed = 500;

	var handleScroll = function() {
		if($(this).scrollTop() >= upShowLimit ) {
			$gototop.fadeIn("fast");
		} else {
			$gototop.fadeOut("fast");
		}
	};

	var goToTop = function() {
		$all.animate({scrollTop: 0}, upAnimationSpeed);
	};

	if(abTests.isInTreatment('gototop')) {
		$win.scroll(handleScroll);
		$gototop.click(goToTop);
	}
}();

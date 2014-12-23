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
	var $topnav = $('#topnav');
	var $topnavcu = $('#topnavCM');
	var $contactForm = $('#cuName');
	var $firstbox = $('.box').first();
	var $contactFormNameField = $contactForm;
	var $navMenu = $('.nav-menu');
	var isSmall = $('.large-only').css('display') === 'none';

	var upShowLimit = 200;
	var animationSpeed = 500;

	var handleScroll = function() {
		if($(this).scrollTop() >= upShowLimit ) {
			$gototop.fadeIn("fast");
		} else {
			$gototop.fadeOut("fast");
		}
	};

	var goToTop = function() {
		$all.animate({scrollTop: 0}, animationSpeed);
	};

	var goToContactForm = function() {
		if(browserCapabilities.isSmallDevice()) {
			closeResponsiveMenu();
		}
		$all.animate({
			scrollTop: $contactForm.offset().top
		}, animationSpeed);
		setTimeout(function() {
			$contactFormNameField.focus();
		}, 1);

		return false;
	};

	var toggleResponsiveMenu = function() {
		$('.main').toggleClass('open');
		$('.nav').toggle();
	};

	var closeResponsiveMenu = function() {
		$('.main').removeClass('open');
		$('.nav').hide();
	};

	if(abTests.isInTreatment('gototop')) {
		$win.scroll(handleScroll);
		$gototop.click(goToTop);
	}

	if(abTests.isInTreatment('topnav')) {
		$topnavcu.click(goToContactForm);
		if(browserCapabilities.isSmallDevice()) {
			$navMenu.show();
		} else {
			$firstbox.css('margin-top','0');
			$topnav.show();
		}
		$navMenu.click(toggleResponsiveMenu);
	}
}();

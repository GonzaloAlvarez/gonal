describe('Grunt Home Site Tests - Integration', function() {

	var SECTIONS = 5;
	var SOCIAL_ICONS = 6;

	beforeEach(function() {
	});

	describe('General Document Structure', function() {
		it('should have all boxes and headers', function() {
			expect($('.box')).toHaveLength(SECTIONS);
			expect($('.box .header')).toHaveLength(SECTIONS - 1);
		});
	});

	describe('Title section', function() {
		it('should have the avatar picture', function() {
			expect($('.box .container .avatar')).toBeVisible();
			expect($('.box .container .avatar')).toContainElement('span');
			expect($('.box .container .avatar .avatar-image').css('background-image')).toContain('img/avatar.png');
		});

		it('should have the title right', function() {
			expect($('.box .container.info h1')).toContainText('Gonzalo Alvarez');
			expect($('.box .container.info h2')).toContainText('Software Development Engineer');
		});

		it('should have the right social icon count', function() {
			expect($('.box .social li')).toHaveLength(SOCIAL_ICONS);
		});
	});

	describe('Profesional Experience section', function() {
		var PE_ENTRIES = 4;
		var $PEsection = $('.box:nth(1)');

		it('should have the right header', function() {
			expect($PEsection.find('.header')).toContainText('Professional Experience');
		});

		it('should have the right amount of entries', function() {
			expect($PEsection.find('.container .cventry')).toHaveLength(PE_ENTRIES);
		});
		
		it('should have the right entries content', function() {
			$PEsection.find('.cventry').each(function(index, entry) {
				expect($(entry).find('.dates')).toBeVisible();
				expect($(entry).find('.achievement')).toBeVisible();
			});
		});
	});
});

describe("Grunt Home Site Tests - Integration", function() {

	var SECTIONS = 5;

	beforeEach(function() {
	});

	describe("General Document Structure", function() {
		it('should have all boxes and headers', function() {
			expect($('.box')).toHaveLength(SECTIONS);
			expect($('.box .header')).toHaveLength(SECTIONS - 1);
		});
	});

	describe("Title section", function() {
		it('should have the avatar picture', function() {
			expect($('.box .container .avatar')).toBeVisible();
			expect($('.box .container .avatar')).toContainElement('span');
			expect($('.box .container .avatar .avatar-image').css('background-image')).toContain('img/avatar.png');
		});
	});
});

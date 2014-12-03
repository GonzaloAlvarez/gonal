describe("General Home Site Tests - Integration", function() {
	beforeEach(function() {
		jasmine.getFixtures().fixturesPath = 'build/live';
		loadFixtures('index.html');
	});

	describe("General Document Structure", function() {
		it('Boxes', function() {
			expect($('.box')).toExist();
			expect($('.box').length).toBe(5);
		});
	});
});

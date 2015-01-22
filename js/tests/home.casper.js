casper.test.begin('Test home site', function suite(test) {
    casper.start('file://' + casper.cli.options.basepath + '/index.html', function() {
        test.assertTitle('Gonzalo Alvarez - Software Development Engineer');
        test.assertElementCount('.box', 5);
        test.assertElementCount('.box .header', 4);

        test.comment('Testing top avatar box');
        test.assertVisible('.box .container .avatar', 'Avatar selector is visible');
        test.assertEval(function() {
            return $('.box .container .avatar .avatar-image').css('background-image').indexOf('avatar.png') > -1;
        }, 'Avatar image is used as background');
        test.assertResourceExists('avatar.png', 'Avatar image is loaded properly');

        test.comment('Testing headers');
        test.assertSelectorHasText('.box .container.info h1', 'Gonzalo Alvarez');
        test.assertSelectorHasText('.box .container.info h2', 'Software Development Engineer');

        test.comment('Check for social icons');
        test.assertElementCount('.box .social li', 6);

        test.comment('PROFESSIONAL EXPERIENCE SECTION');
        test.comment('Testing header');
        test.assertSelectorHasText('.main .box:nth-child(2) .header', 'Professional Experience');

        test.comment('Testing entries in professional experience');
        test.assertEvalEquals(function() {
            return $('.box:nth(1) .cventry').length;
        }, 4, 'Found four CV Entries in the Professional Experience setion');

        for(cventry = 0; cventry < 4; cventry++) {
            test.assertEval(function(entry) {
                return ($('.box:nth(1) .cventry:nth(' + entry + ') .dates').is(":visible") && 
                    $('.box:nth(1) .cventry:nth(' + entry + ') .achievement').is(":visible"));
            }, 'Checking dates and achievements visibility on cventry ' + cventry, cventry);
        }

    });
    casper.run(function() {
        test.done();
    });
});

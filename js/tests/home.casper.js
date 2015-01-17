casper.test.begin('Test home site', function suite(test) {
    casper.start('file://' + casper.cli.options.basepath + '/index.html', function() {
        test.assertTitle('Gonzalo Alvarez - Software Development Engineer');
        test.assertElementCount('.box', 5);
        test.assertElementCount('.box .header', 4);

        test.comment('Testing top avatar box');
        test.assertVisible('.box .container .avatar');
    });
    casper.run(function() {
        test.done();
    });
});

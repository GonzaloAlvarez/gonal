// JS GonAl project - Casper link checker
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var locationBase = 'file://' + casper.cli.options.basepath + '/';


casper.getLinks = function getLinks() {
    links = this.evaluate(function(locationBase) {
        return [].map.call($('a'), function(link) {
            var linkHref = link.getAttribute('href');
            if((/^http/).test(linkHref)) {
                return linkHref;
            } 
            if((/^mailto/).test(linkHref) || linkHref === '#' || !linkHref) {
                return '#';
            }
            return locationBase + linkHref;
        }).filter(function(link) {
            return link !== '#';
        }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        });
    }, locationBase);
    this.links = links;
}

casper.visit = function visit(link) {
    this.thenOpen(link, function(response) {
        if(response.status === 500 && this.getPageContent().length > 0) {
            this.warn('Opening [' + link + '] has content but throws response 500 (theserverlabs.com?)');
        } else if(response.status !== 200) {
            this.die('Opening [' + link + '] has failed with response: ' + response.status, 1);
        } else {
            this.echo('Opening [' + link + '] has been successful.');
        }
    });
}

casper.crawl = function crawl() {
    while((link = this.links.pop()) != null) {
        if((/^http/).test(link)) {
            this.visit(link);
        }
    }
}

casper.start(locationBase + 'index.html');
casper.then(casper.getLinks);
casper.then(casper.crawl);

casper.run(function() {
    this.exit();
});

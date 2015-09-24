// JS GonAl project - Casper link checker
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var locationBase = 'file://' + casper.cli.options.basepath + '/';
var locations = [locationBase + 'index.html'];
var currentIndex = 0;
var visitedLocations = ['https://gon.al'];

casper.getLinks = function getLinks() {
    links = this.evaluate(function(locationBase) {
        return [].map.call(__utils__.findAll('a'), function(link) {
            var linkHref = link.getAttribute('href');
            if((/^http/).test(linkHref)) {
                return linkHref;
            }
            if((/^mailto/).test(linkHref) || linkHref === '#' || !linkHref) {
                return '#';
            }
            if (/^\//.test(linkHref)) {
                linkHref = linkHref.substring(1);
            }
            if (/\/$/.test(linkHref)) {
                linkHref = linkHref + 'index.html';
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
        } else if(response.status === 999 && link.indexOf('linkedin') > -1) {
            this.warn('Opening [' + link + '] returns 999 due to likedin filtering');
        } else if(response.status !== 200) {
            this.log('Opening [' + link + '] has failed with response: ' + response.status, 'error');
        } else {
            this.echo('Opening [' + link + '] has been successful.');
        }
    });
}

casper.crawl = function crawl() {
    while(this.links && (link = this.links.pop())) {
        if((/^http/).test(link)) {
            if (visitedLocations.indexOf(link) === -1) {
                this.visit(link);
                visitedLocations.push(link);
            }
        } else {
            if (locations.indexOf(link) === -1) {
                if(! /\.pdf$/.test(link) && ! /\.xml$/.test(link)) {
                    locations = locations.concat(link);
                }
            }
        }
    }
}

function cycle() {
    if (locations[currentIndex]) {
        casper.start().thenOpen(locations[currentIndex]);
        casper.then(casper.getLinks);
        casper.then(casper.crawl);
        casper.run(function() {
            this.links = [];
            this.clear();
            currentIndex ++;
            cycle();
        });
    } else {
        casper.exit();
    }
}

casper.options.stepTimeout = 10000;
casper.options.pageSettings = {
      "userAgent": 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.10 (KHTML, like Gecko) Chrome/23.0.1262.0 Safari/537.10',
      "loadImages": false,
      "loadPlugins": false,         
      "webSecurityEnabled": false,
      "ignoreSslErrors": true
};

casper.options.onStepTimeout = function(self, step) { 
    this.clear();
    this.page.stop();
    this.echo("Request timed out",'WARNING');
};

cycle();

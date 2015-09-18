
hexo.extend.tag.register('svideo', function(args, content) {
    'use strict';

    var videoname = args.shift();
    var alttext = args.join(' ');
    return '<center>' +
        '<video autoplay="" loop="" muted="" poster="https://v.gon.al/' + videoname + '.jpg">' +
            '<source type="video/webm" src="https://v.gon.al/' + videoname + '.webm">' +
            '<source type="video/mp4" src="https://v.gon.al/' + videoname + '.mp4">' +
            '<img src="https://v.gon.al/' + videoname + '.jpg" data-src="https://v.gon.al/' + videoname + '.gif" ' +
            'alt="' + alttext + '"/></video></center>';
});

var htmlTag = require('hexo-util').htmlTag;
hexo.extend.tag.register('svideo', function(args, content) {
    'use strict';

    var MEDIA_URLBASE='https://v.gon.al/';

    var mediaName = args.shift();
    var mediaUrl = MEDIA_URLBASE + mediaName;

    var alternativeText = args.join(' ');

    var webMSource = htmlTag('source',{'type':'video/webm', 'src': mediaUrl + '.webm'});
    var mp4Source = htmlTag('source',{'type':'video/mp4', 'src': mediaUrl + '.mp4'});
    var innerImage = htmlTag('img',{
        'src': mediaUrl + '.jpg', 
        'data-src': mediaUrl + '.gif', 
        'alt': alternativeText});

    var videoTag = htmlTag('video', {'autoplay':' ', 'loop': ' ', 'muted':' ', 'poster': mediaUrl + '.jpg'},
        webMSource + mp4Source + innerImage);

    var titleDiv = '';
    if (alternativeText.length > 0) {
        titleDiv = htmlTag('div', {'class': 'svtitle'}, alternativeText);
    }

    return htmlTag('div', {'class':'svideo'}, videoTag + titleDiv);
});

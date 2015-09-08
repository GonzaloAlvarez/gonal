// JS GonAl project - Video playing capabilities
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var videoAutoplay = function($) {
    'use strict';

    var $firstVideo = $('video:first-of-type');
    var firstVideo = $firstVideo?$firstVideo.get(0):null;
    var timeout;

    if(firstVideo) {
        if (firstVideo.canPlayType && 
                (firstVideo.canPlayType('video/mp4') || firstVideo.canPlayType('video/webm'))) {
            setTimeout(function() {
                $firstVideo.on('playing', testAutoplay);
                timeout = setTimeout(testAutoplay, 1000);
            }, 0);
        } else {
            updateVideoTagWithGif();
        }
    }

    var testAutoplay = function(args) {
        clearTimeout(timeout);
        $firstVideo.off('playing', testAutoplay);
        if(!(args && args.type === 'playing' && $firstVideo.currentTime !== 0)) {
            updateVideoTagWithGif();
        }
    };

    var updateVideoTagWithGif = function() {
        $('video').each(function() {
            var $img = $(this).find('img:first-of-type');
            $img.attr('src', $img.attr('data-src'));
            $(this).replaceWith($img.get(0));
        });
    };
}(jQuery);

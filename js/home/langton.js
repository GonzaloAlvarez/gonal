// JS GonAl project - Form Management
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//


var langtonToy = function($) {

    'use strict';

    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();
    var boxesX=viewportWidth/10 | 0;
    var boxesY=viewportHeight/10 | 0;
    var centerX=boxesX/2|0;
    var centerY=boxesY/2|0;
    var centerBox=centerX*boxesX+centerY;
    var currentPosition = centerBox;
    var previousPosition = centerBox;
    var facingDirection = 0;
    var baseProperties = {
        "border":"1px solid",
        "width":"9px",
        "height":"9px",
        "position":"absolute"
    };
    var directions = [-1, boxesX, 1, -1 * boxesX];

    var showSymbol = function() {
        if(browserCapabilities.isDesktop()) {
            var $pisymbol = $('<span id="pisymbol" style="position:fixed;top:0px;right:0px;font-size:0.8em;cursor:pointer">&pi;</span>');
            $pisymbol.appendTo('body');
            $pisymbol.on('contextmenu', function(event) {
                    if(event && event.originalEvent && event.originalEvent.ctrlKey === true) {
                        $(this).hide();
                        initialize();
                        event.preventDefault();
                        return false;
                    }
                });
            setTimeout(function() {$pisymbol.remove();}, 5000);
        }
    };

    setTimeout(showSymbol, 10000);

    var initialize = function() {

        $("<style type='text/css'> .boxvisited{ background-color:red;} </style>").appendTo("head");

        for(var i=0;i<boxesX;i++) {
            for(var j=0;j<boxesY;j++) {
                $('<div></div>',{
                    "id":"langton-"+(i*boxesX+j)
                })
                    .css($.extend(baseProperties, {"top":2+j*10+"px","left":2+i*10+"px"}))
                    .appendTo('body');
            }
        }

        $('#langton-' + centerBox).toggleClass('boxvisited');
        setInterval(function() {
            previousPosition = currentPosition;
            currentPosition += directions[Math.abs(facingDirection)%4];
            if($('#langton-' + currentPosition).hasClass('boxvisited')) {
                facingDirection--;
            } else {
                facingDirection++;
            }
            $('#langton-' + previousPosition).toggleClass('boxvisited');
        }, 40);
    };

}(jQuery);

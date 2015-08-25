// JS GonAl project - Use secure port for gravatar
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var rEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


hexo.extend.helper.register('sgravatar', function(email, size) {
    var querystring = require('querystring');
    var crypto = require('crypto');
    var qd;

    if (size && typeof size === 'number') {
        qd = {s: size}
    }

    var str = 'https://secure.gravatar.com/avatar/' + crypto.createHash('md5').update(email).digest('hex');
    var qs = querystring.stringify(qd);
    if (qs) str += '?' + qs;

    return str;
});

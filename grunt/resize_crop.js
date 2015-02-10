// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
    meta: {
        options: {
            gravity: "North",
            width: 1200,
            height: 1200,
            format: "png"
        },
        files: {
            'build/live': ['build/meta.png']
        }
    }
};

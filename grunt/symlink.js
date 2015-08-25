// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
    blog: {
        files: [
            {
                src: 'node_modules',
                dest: 'build/blog/node_modules'
            },
            {
                src: 'package.json',
                dest: 'build/blog/package.json'
            },
            {
                src: 'blog/posts',
                dest: 'build/blog/source/_posts'
            },
            {
                src: 'blog/_config.yml',
                dest: 'build/blog/_config.yml'
            },
            {
                src: 'blog/scripts',
                dest: 'build/blog/scripts'
            }
        ]
    }
};

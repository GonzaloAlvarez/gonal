// Gruntfile GonAl project
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

module.exports = function(grunt) {
	require('load-grunt-config')(grunt, {
		loadGruntTasks: {
			pattern: ['grunt-*','assemble']
		},
		data: {
			pkg: grunt.file.readJSON('package.json'),
			files: grunt.file.readJSON('grunt/files.json'),
			aws: grunt.file.exists('aws-s3.json')? grunt.file.readJSON('aws-s3.json'): {
                "AWSAccessKeyId" : process.env.AWS_AccessKey_Id,
                "AWSSecretKey" : process.env.AWS_SecretKey
            },
			cf: grunt.file.exists('cloudflare.json')? grunt.file.readJSON('cloudflare.json'): {
                "Email" : process.env.Cloudflare_Email,
                "ApiKey" : process.env.Cloudflare_ApiKey
            },
            mailgun: grunt.file.exists('mailgun.json')? grunt.file.readJSON('mailgun.json'): {
                "ApiKey" : process.env.Mailgun_ApiKey,
                "Sender" : process.env.Mailgun_Sender,
                "Recipient" : process.env.Mailgun_Recipient
            }
		},
		postProcess: function(config) {
			config.home = {};
			config.home.js = config.files.js.home3p.concat(config.files.js.home);
            config.blog = {};
            config.blog.js = config.files.js.blog3p.concat(config.files.js.blog);
		}
	});
    grunt.loadTasks('grunt/tasks');
};

// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
	options: {
		accessKeyId: '<%= aws.AWSAccessKeyId %>',
		secretAccessKey: '<%= aws.AWSSecretKey %>',
		region: 'eu-west-1',
		uploadConcurrency: 5,
		downloadConcurrency: 5
	},
	clean: {
		options: {
			bucket: 'gon.al'
		},
		files: [
			{dest: '/', action: 'delete'}
		]
	},
	prod: {
		options: {
			bucket: 'gon.al',
			params: {
				ContentEncoding: 'gzip',
				CacheControl: 'max-age=3600'
			}
		},
		files: [
			{expand:true, cwd: 'build/deploy/', src: ['**'], dest:''}
		]
	}
};

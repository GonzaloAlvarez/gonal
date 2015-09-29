// Gruntfile GonAl project
// 
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//
module.exports = {
    report: {
        options: {
            key: '<%= mailgun.ApiKey %>',
            sender: '<%= mailgun.Sender %>',
            recipient: '<%= mailgun.Recipient %>',
            subject: 'Gon.al deployed - ',
            hideRecipient: true,
            preventThreading: true
        },
        src: ['build/report.html']
    }
};

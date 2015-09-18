// JS GonAl project - Form Management
//
// Gonzalo Alvarez, 2014
// Work licensed under
// Creative Commons Attributions-NonCommercial-NoDerivaties 4.0 International License
// See: http://creativecommons.org/licenses/by-nc-nd/4.0/
//

var gaForm = function() {

	gaParse.init();

	var ContactForm = Parse.Object.extend("ContactForm");
	var $form = $('#cuForm');
	var $spinner = $form.find('#cuSpinner');
	var $success = $form.find('#cuSent');
	var $valfail = $form.find('#cuValFail');
	var $failure = $form.find('#cuSendFail');
	var $nameField = $form.find('#cuName');
	var $emailField = $form.find('#cuEmail');
	var $messageField = $form.find('#cuMessage');
	var $submitButton = $form.find('#cuSubmit');

	$.validate({
		form: '#cuForm',
		onSuccess: function(form) {
			changeStatus('sending');
			pushMessage();
			return false;
		},
		onError: function(form) {
			changeStatus('valfail');
			return false;
		}
	});

	var changeStatus = function(st) {
		$success.hide();
		$failure.hide();
		$submitButton.hide();
		$spinner.hide();
		$valfail.hide();
		if(st === 'sending') {
			$spinner.show();
		} else if(st === 'success') {
			$success.show();
            $nameField.val("");
            $emailField.val("");
            $messageField.val("");
			setTimeout(function() {
				changeStatus('normal');
			},5000);
		} else if(st === 'failure') {
			$failure.show();
			setTimeout(function() {
				changeStatus('normal');
			},5000);
		} else if(st === 'valfail') {
			$valfail.show();
			setTimeout(function() {
				changeStatus('normal');
			},5000);
		} else {
			$submitButton.show();
		}
	};

	var pushMessage = function() {
		var contactForm = new ContactForm();
		var data = {};

		data.Name = $nameField.val();
		data.Email = $emailField.val();
		data.Message = $messageField.val();

		contactForm.save(data, {
			success: function() {
				changeStatus('success');
			},
			error: function(e) {
				changeStatus('failure');
			}
		});
	};
}();

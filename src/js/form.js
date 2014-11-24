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
			$form.find("input[type=text], textarea").val("");
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

		data.Name = $form.find('#cuName').val();
		data.Email = $form.find('#cuEmail').val();
		data.Message = $form.find('#cuMessage').val();

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

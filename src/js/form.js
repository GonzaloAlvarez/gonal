var gaForm = function() {
	var parseAPPID = 'jWGufLAHzOWI3YZvK6XtTPOkeVb6vTLvtdTokslZ';
	var parseJSID = 'MEcv6Rdtj6MW7CxSIlC4ZerblfulEU4cZogsxN0n';

	Parse.initialize(parseAPPID, parseJSID);

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
			pushMessage(form);
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
	}

	var pushMessage = function(form) {
		var contactForm = new ContactForm();
		var data = {};

		data.Name = form.find('#cuName').val();
		data.Email = form.find('#cuEmail').val();
		data.Message = form.find('#cuMessage').val();

		contactForm.save(data, {
			success: function() {
				changeStatus('success');
			},
			error: function(e) {
				changeStatus('failure');
			}
		});
	}
}();

$('.submit_btn').click(function() {
	
		var fname				=	$('#fname');
		var lname				=	$('#lname');
		var femail				=	$('#femail');
		var fmessage			=	$('#fmessage');
		var unit				=	$('.unit');
	    var unit1				=	$('.unit');
		var unit2				=	$('.unit');	
        var unit3				=	$('.unit');
		var error = 0;
		
				fname.css		({'border':'1px solid #060'});
				lname.css		({'border':'1px solid #060'});
				femail.css		({'border':'1px solid #060'});
				fmessage.css	({'border':'1px solid #060'});
				unit.css	    ({'border':'1px solid #060'});
				unit1.css	    ({'border':'1px solid #060'});
				unit2.css	    ({'border':'1px solid #060'});
                unit3.css	    ({'border':'1px solid #060'});
				
			$('.errS').text('');
				
				// First Name 
				if($.trim($('#fname').val()) == 'First Name' || $('#fname').val() == '') {
					fname.css({'border':'1px solid #f00'});
					error = 1;
				}
				
				// Last Name 
				if($.trim($('#lname').val()) == 'Last Name' || $('#lname').val() == '') {
					lname.css({'border':'1px solid #f00'});
					error = 1;
				}
				
				// E-mail 			
				if($('#femail').val() == 'E-Mail' || $('#femail').val() == '') {
					femail.css({'border':'1px solid #f00'});
					error = 1;
				}else {
					var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
					if(!emailPattern.test($('#femail').val())) {
						femail.css({'border':'1px solid #f00'});
						error = 1;
					}
				}
				
				// Message 
				if($.trim($('#fmessage').val()) == 'Message...' || $('#fmessage').val() == '') {
					fmessage.css({'border':'1px solid #f00'});
					error = 1;
				}
				
				// Radio btn's
				var fields = $('input[name=unit]:checked').serializeArray();
					if (fields.length == 0) {
						$('.radio_btns').css('color','red');  
						error = 1; 
				}else{
					$('.radio_btns').css('color','');
					}
				
            // Radio btn's
				var fields = $('input[name=unit1]:checked').serializeArray();
					if (fields.length == 0) {
						$('.radio_btns').css('color','red');  
						error = 1; 
				}else{
					$('.radio_btns').css('color','');
					}
				
            // Radio btn's
				var fields = $('input[name=unit2]:checked').serializeArray();
					if (fields.length == 0) {
						$('.radio_btns').css('color','red');  
						error = 1; 
				}else{
					$('.radio_btns').css('color','');
					}
            // Radio btn's
				var fields = $('input[name=unit3]:checked').serializeArray();
					if (fields.length == 0) {
						$('.radio_btns').css('color','red');  
						error = 1; 
				}else{
					$('.radio_btns').css('color','');
					}
    
				if(error) {
					$('.errS').text('Required : valid info.');
					return false;
				}
			
					$.ajax({
							url: 'contacteditorial-submit.php',
							type : 'POST',
							data : $('#contact_form').serialize(),
							cache: false,
							
							success: function (data) {
									$('.f_success').html(data);
									$('.f_success').show();
									$('.sucess-message').show();
                                    $('.editors').hide();
									fname.val('');
									lname.val('');
									femail.val('');
									fphone.val('');
									fmessage.val('');
									unit.val('');
                                    unit1.val('');
                                    unit2.val('');
                                    unit3.val('');
							}
					});
					return false;
		});

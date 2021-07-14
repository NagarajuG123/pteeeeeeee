$(".feild4").keypress(function (e) {
         if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
         return false;
        }
       });
        $('.submit_btn').click(function() {
		var fname				=	$('.feild1');
		var lname				=	$('.feild2');
        var femail				=	$('.feild3');
		var fmessage			=	$('.feild9');
		var fcode			=	$('.feild10');	
		var error = 0;
            fname.css		({'border':'1px solid #060'});
            lname.css		({'border':'1px solid #060'});
            femail.css		({'border':'1px solid #060'});
            fmessage.css	({'border':'1px solid #060'});
            fcode.css	({'border':'1px solid #060'});
			$('.errS').text('');
				
				// First Name 
				if($.trim($('.feild1').val()) == 'FIRST NAME*' || $('.feild1').val() == '') {
					fname.css({'border':'1px solid #f00'});
					error = 1;
				}
				// Last Name 
				if($.trim($('.feild2').val()) == 'LAST NAME*' || $('.feild2').val() == '') {
					lname.css({'border':'1px solid #f00'});
					error = 1;
				}
				// E-mail 			
				if($('.feild3').val() == 'EMAIL*' || $('.feild3').val() == '') {
					femail.css({'border':'1px solid #f00'});
					error = 1;
				}else {
					var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
					if(!emailPattern.test($('.feild3').val())) {
						femail.css({'border':'1px solid #f00'});
						error = 1;
					}
				}
				// Message 
				if($.trim($('.feild9').val()) == 'WHY ARE YOU INTERESTED IN BUFFALO WINGS & RINGS?*' || $('.feild9').val() == '') {
					fmessage.css({'border':'1px solid #f00'});
					error = 1;
				}
				// code 
				if($.trim($('.feild10').val()) == 'VERIFY CODE BELOW*' || $('.feild10').val() == '') {
					fcode.css({'border':'1px solid #f00'});
					error = 1;
				}
				if(error) {
					$('.errS').text('Required : valid info.');
					return false;
				}
					$.ajax({
							url: 'submit.php',
							type : 'POST',
							data : $('#contact_form').serialize(),
							cache: false,
							success: function (data) {
									$('.f_success').html(data);
									$('.f_success').show();
									fname.val('');
									lname.val('');
									femail.val('');
									fphone.val('');
                                    fcity.val('');
                                    fstate.val('');
                                    fselect1.val('');
									fselect2.val('');
									fmessage.val('');
									//check1.val('');
									//fradio2.val('');
							}
					});
					return false;
		});
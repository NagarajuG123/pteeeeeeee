//contact-form
            $(".feild4").keypress(function (e) {
         if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
         return false;
        }
       });
        $('.submit_btn').click(function() {
		var fname				=	$('.feild1');
		var lname				=	$('.feild2');
        var femail				=	$('.feild3');
		var fphone				=	$('.feild4');
        var fcity				=	$('.feild5');
		var fstate				=	$('.feild6');
		var fselect1			=	$('.feild7');
		var fselect2			=	$('.feild8');
		var fmessage			=	$('.feild9');	
		var error = 0;
				fname.css		({'border':'1px solid #060'});
				lname.css		({'border':'1px solid #060'});
				femail.css		({'border':'1px solid #060'});
				fphone.css		({'border':'1px solid #060'});
    fcity.css		({'border':'1px solid #060'});
    fstate.css		({'border':'1px solid #060'});
    fselect1.css	({'border':'1px solid #060'});
    fselect2.css	({'border':'1px solid #060'});
				fmessage.css	({'border':'1px solid #060'});
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
				// Phone Number 	
				if($.trim($('.feild4').val()) == 'PHONE*' || $('.feild4').val() == '') {
                    fphone.css({'border':'1px solid #f00'});
                    error = 1;
                }$(".feild4").keypress(function (e) {
					 if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
					 return false;
					}
				   });
    // city 
				if($.trim($('.feild5').val()) == 'CITY*' || $('.feild5').val() == '') {
					fcity.css({'border':'1px solid #f00'});
					error = 1;
				}
     //state
				if($.trim($('.feild6').val()) == 'STATE/PROVINCE*' || $('.feild6').val() == '') {
					fstate.css({'border':'1px solid #f00'});
					error = 1;
				}
				
    // First Select drop down
				if($.trim($('.feild7').val()) == 'select' || $('.feild7').val() == '') {
					fselect1.css({'border':'1px solid #f00'});
					error = 1;
				}
    
    // First Select drop down
				if($.trim($('.feild8').val()) == 'select' || $('.feild82').val() == '') {
					fselect2.css({'border':'1px solid #f00'});
					error = 1;
				}
    
				// Message 
				if($.trim($('.feild9').val()) == 'WHY ARE YOU INTERESTED IN BUFFALO WINGS & RINGS?*' || $('.feild9').val() == '') {
					fmessage.css({'border':'1px solid #f00'});
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
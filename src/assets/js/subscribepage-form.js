$('.submit_btn').click(function() {
	
		var femail				=	$('#femail');
		var unit				=	$('.unit');
	    var unit1				=	$('.unit');
		var unit2				=	$('.unit');	
        var unit3				=	$('.unit');
        var news				=	$('#news');
		var error = 0;
		
				femail.css		({'border':'1px solid #060'});
				unit.css	    ({'border':'1px solid #060'});
				unit1.css	    ({'border':'1px solid #060'});
				unit2.css	    ({'border':'1px solid #060'});
                unit3.css	    ({'border':'1px solid #060'});
                news.css        ({'border':'1px solid #060'});
				
			$('.errS').text('');
				
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
            
				// Check boxes 
				var fields = $('input[class=text-field]:checked').serializeArray();
					if (fields.length == 0) {
						$('.checks').css('color','red');  
						error = 1; 
				}else{
					$('.checks').css('color','');
					}
    
				if(error) {
					$('.errS').text('Required : valid info.');
					return false;
				}
			
					$.ajax({
							url: 'subscribepage-submit.php',
							type : 'POST',
							data : $('#contact_form').serialize(),
							cache: false,
							
							success: function (data) {
									$('.f_success').html(data);
									$('.f_success').show();
									$('.sucess-message').show();
                                    $('.editors').hide();
									femail.val('');
									news.val('');
									unit.val('');
                                    unit1.val('');
                                    unit2.val('');
                                    unit3.val('');
							}
					});
					return false;
		});


//For sticky header

var distance = $('header').offset().top,
	$window = $(window);
$(window).scroll(function () {
	if ($window.scrollTop() > distance) {
		$('body').addClass('sticky');
		var ht = $('header').innerHeight();
		$('.empty').css({ 'min-height': ht });
	}
	else {
		$('body').removeClass('sticky');
	}
});
//for menu
$('.menu a').click(function (e) {
	$('body').toggleClass('menu-open');
})
//For navigation
$('nav ul li').has('ul').addClass('has_dd');
$('nav > ul > li > a').click(function () {
	if ($(window).width() < 768) {
		$(this).parent().find('.megamenu').slideToggle();
		$(this).parent().siblings().find('.megamenu').slideUp();
	}
	$(this).parent().addClass('active');
	$(this).parent().siblings().removeClass('active')
})

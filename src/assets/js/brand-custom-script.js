//For custom scrollbar
	$(".vertical_scroll").mCustomScrollbar({
         axis:"y",
        //scrollButtons:{enable:true},
        //theme:"light-thick",
        //scrollbarPosition:"outside"
    });
    // for slider
      $('.slider').slick({   
     dots: false,
	 arrows:true,
     infinite: true,
     speed: 300,
     slidesToShow: 3,
	 slidesToScroll: 1,
	 centerPadding:0,
     centerMode: false,
          responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
    });

//For brandpage video popup
        var $videoSrc;  
$('.video-btn').click(function() {
    $videoSrc = $(this).data( "src" );
});
// when the modal is opened autoplay it  
$('#myModal2').on('shown.bs.modal', function (e) { 
// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
$("#video").attr('src',$videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" ); 
})
// stop playing the youtube video when I close the modal
$('#myModal2').on('hide.bs.modal', function (e) {
    // a poor man's stop video
    $("#video").attr('src',$videoSrc); 
}) 
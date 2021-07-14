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

// Responsive-Tabs		
 $(".tab2").easyResponsiveTabs({
   type: 'horizontal', //Types: default, vertical, accordion         
   tabidentify: 'tab-identifier2', // The tab groups identifier *This should be a unique name for each tab group and should not be defined in any styling or css file.
   });

//For expand colapse
$('.spotlight-links ul li:first-child').removeClass('resp-tab-active')

//For spotlight
$(window).resize(function(){
  var x= $('.spotlighttab-cnt-left').height();
  $('.spotlighttab-cnt-right .vertical_scroll').height(x);
  });
  function heights(){
  var x= $('.spotlighttab-cnt-left').height();
  $('.spotlighttab-cnt-right .vertical_scroll').height(x);
  }
  
  $(window).resize(function(){
  var x= $('.spotlighttab-cnt-left').height();
  $('.spotlighttab-cnt-right .vertical_scroll').height(x);
  });
  $(window).on('load', function(){
  heights();
  });
  heights();
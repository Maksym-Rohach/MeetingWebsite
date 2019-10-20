(function($) {
  "use strict"; // Start of use strict
    
// Closes the sidebar menu
  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    $(this).toggleClass("active");
  });


  // Closes responsive menu when a scroll trigger link is clicked
  $('#sidebar-wrapper a.js-scroll-trigger').click(function() {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  $( ".carousel .carousel-inner" ).swipe( {
    swipeLeft: function ( event, direction, distance, duration, fingerCount ) {
    this.parent( ).carousel( 'next' );
    },
    swipeRight: function ( ) {
    this.parent( ).carousel( 'prev' );
    },
    threshold: 0
    } );
    $('#featured-carousel.carousel').carousel({
  interval: 4000
    });
  
})(jQuery); // End of use strict

// Search Bar & Toggle
$('#toggle-search').on('click', function() {
  $('#searchBar').toggle('display: inline-block');
});
$('#myTab a').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
});
    
  // will first fade out the loading animation
  $("#loader").fadeOut();
  //then background color will fade out slowly
  $("#loader-wrapper").delay(200).fadeOut("slow");
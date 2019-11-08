function smoothScroll() {
$('a[href^="#"]').click(function(event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 750);
    }
});
}

function navStopScroll() {
	if ($(window).width() < 768 && $('nav').is(".active")) {
		$('html, body').css({
	    overflow: 'hidden',
		});
	} else {
		$('html, body').css({
	    overflow: 'auto',
		});
	}
}

function btnOrganize() {
	var types = ["short","doc","music","other"];
	var transition = 000;
	$('.organizer-btns button').click(function(event) {
		btnType = $(this).attr("id");
		$('.organizer-btns button').removeClass("activebtn");
		$(this).addClass("activebtn");
		$("." + btnType).show(transition);
		if (btnType != "all") {
			for (i = 0; i < types.length; i++) {
				if (btnType != types[i]) {
					$("." + types[i]).hide(transition);
				}
			}
		}
	});
}

$(document).ready(function(){
	$('.down-btn-first').fadeIn(1000);
	$('.menu-btn a').click(function(event) {
	  event.preventDefault();
	  $('nav').toggleClass("active");
	  	navStopScroll();
	  if ( $('nav').is(".active") ) {
			$(".page, nav, .up-btn, .down-btn-first").on("click", function(){
		  	$('nav').removeClass("active");
		  		navStopScroll();

			});
		}
	});

          
	$(window).scroll(function() {
	  if ($(window).scrollTop()>60) {
	    $('.up-btn').fadeIn();
	  } else {
	    $('.up-btn').fadeOut(100);
	  }
	});

	smoothScroll();
	btnOrganize();

});
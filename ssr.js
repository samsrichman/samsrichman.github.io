var nav = $('nav')

function navMargin() {
	navHeight = nav.outerHeight();
	$('.section:not(.section-home)').css({'padding-top':navHeight});
}
function sectSize() {
	viewHeight = $(window).height();
	$('.section').each(function(){
		var initHeight = $(this).height();
		var heightDiff = viewHeight - initHeight;
		var halfDiff = heightDiff / 2;
		var padAmount = 0
		navMargin();
		if (heightDiff > 0 && $(this).is('.section-home')) {
			$(this).css({'margin-top':halfDiff,'margin-bottom':halfDiff})
		} else if (heightDiff > (padAmount+navHeight) && $(this).is('.section-about')) {
			$(this).css({'margin-bottom':heightDiff});
			var newMarg = parseInt($('.section-about').css('margin-bottom'))-navHeight;
			$(this).css({'margin-bottom':newMarg});
		} else if (0 < heightDiff < (padAmount+navHeight) && $(this).is('.section-about')) {
			$(this).css({'margin-bottom':padAmount});
		} else if (heightDiff > padAmount) {
			$(this).css({'margin-bottom':heightDiff});
		} else {
			$(this).css({'margin-bottom':padAmount});
		}
		if ($(this).is('.section-about')) {
		}
	});
}

function navSwitch() {
	var scrollHeight = $(window).scrollTop()
	var hasFixed = nav.hasClass('fixed')
	
	if (scrollHeight >= viewHeight && !hasFixed) {
    	nav.addClass('fixed'); 
    } else if(scrollHeight < viewHeight && hasFixed) {
    	nav.removeClass('fixed');
    }
}

function smoothScroll() {
	$('a[href^="#"]').click(function(event) {
	    var target = $(this.getAttribute('href'));
	    if (target.length) {
	        event.preventDefault();
	        $('html, body').stop().animate({
	            scrollTop: target.offset().top
	        }, 800);
	    }
	});
}
/*
function scrollUpdate() {
	var currentHash = ""
	$(document).scroll(function () {
	    $('.section').each(function () {
	    	//how much the page is scrolled down
	        var top = window.pageYOffset;
	        //how far the section is from the start of doc
	        var distance = $(this).offset().top - top;
	        var elHeight = $(this).height();
	        var hash = "#" + $(this).attr('id');
	        if (distance < elHeight/2 && distance > -elHeight/2 && currentHash != hash) {
	            window.history.pushState(null, null, hash);
	            currentHash = hash;
	        }
	        
	    });
	});
}*/

$(document).ready(function(){
	$('body').fadeIn();
	sectSize();
	$(window).on('scroll resize',function(){
		navSwitch();
	});
	smoothScroll();
	//scrollUpdate();
	//anchorMagic();
});
$(window).resize(function(){
	sectSize();
});



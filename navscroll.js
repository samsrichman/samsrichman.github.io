// ALL THE CODE I ADDED IS IN THE FOLLOWING SECTIONS //

////////////////////////////////////
// CODE FOR HREF UPDATE ON SCROLL //
////////////////////////////////////

// THE MOST IMPORTANT PIECE OF CODE TO UPDATE YOUR URL
//
// if (window.history.pushState) {
//   var urlHash = "#" + $(el).attr("id");
//   window.history.pushState(null, null, urlHash);
// }

// The condition checks to see if the browser supports HTML5 
// (that way you don't explode Internet Exploder 10 and earlier)
// (N.B.  It is perfectly valid to want to explode Internet Exploder 10 or earlier)

// urlHash is the hash that is attached to the end of your url. Note for your website,
// urlHash MUST begin with a '#' or the code will break (if you don't want hashes,
// let me know)

// window.history.pushState(null, null, urlHash); is the code that actually updates
// the url, appending urlHash to the end of the current url.

// Helpful Source: http://stackoverflow.com/questions/30734552/change-url-while-scrolling
function isElementInViewport (el) {
  // This is a helpful "catch all" for el, since javascript is untyped.
  // (This is also why javascript is a terrible language, but I digress).
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }

  // This contains the current position of the "rendered" box from the browser.
  var rect = el.getBoundingClientRect();

  // You might need to adjust this, depending on how early you want the url to change.
  var offset = - document.documentElement.clientHeight/4;

  // Since you have no horizontal scrolling, the following code 'should' indicate when a section
  // is in view (simplified from the SO example which actually doesn't work for your site).
  var topBoundary = offset + rect.top;
  var bottomBoundary = offset + rect.bottom;
  var result = (
    topBoundary <= 0 &&
    bottomBoundary >= 0
  );

  // This is either true or false.
  return result;
}

// LOAD IMAGES WHEN GIVEN SPECIFIC ID, also create url when loading id.

// Each of your images in contained in a div (e.g. filmbox). 
// Make sure each of these images have a unique id and have the class 'anchor-target'
// Example:
// <div class="box-size filmbox anchor-target" id="intersection-video">
// <a class="video-popup" href="https://www.youtube.com/watch?v=0Jt09fnloxM" alt="The Intersection" caption="A driver waits at a red light."><figure><img src="./Sam Richman_files/thumb_int.png" class="img-responsive" id="rotl05">
// <figcaption class="mdcap">The Intersection <small>(Short Film)</small></figcaption></figure></a></div>
// </div>

// this will autoload the filmbox, given the correct id.
var scrollLock = false;
$(window).load(function() {
  if ("onhashchange" in window) { // does the browser support the hashchange event?
    window.onhashchange = function () {
      if (checkAnchor()) {
        return false;
      } else {
        return true;
      }
    }
  }

  $('.gallery').each(function (idx, el) {
    console.log(el);
      $(el).on('mfpOpen', function(e) {
        var urlHash = "#" + $(this).attr("id") + "_" + ($.magnificPopup.instance.currItem.index + 1);
        console.log(urlHash);
        window.history.pushState(null, null, urlHash);
      });
      $(el).on('mfpChange', function(e) {
        var urlHash = "#" + $(this).attr("id") + "_" + ($.magnificPopup.instance.currItem.index + 1);
        console.log(urlHash);
        window.history.pushState(null, null, urlHash);
      });
    }
  );

  $('.anchor-target').on('click', function() {
    if (!$(this).hasClass('gallery')) {
      if (window.history.pushState) {
        var urlHash = "#" + $(this).attr("id");
        window.history.pushState(null, null, urlHash);
      }
    }
  });

  checkAnchor();
  afterPageLoad();
});

function checkAnchor() {
  
  var anchor = parent.location.href.toLowerCase();

  if (anchor.indexOf('#') == -1) {
    anchor += "#home";
  }
  anchor = anchor.split('#').pop();
  console.log(anchor);
  anchor = '#' + anchor;
  // If the anchor is an "anchor-target" simulate a click.
  if ($(anchor).attr('class') && $(anchor).attr('class').split(' ').indexOf('anchor-target') != -1) {
    console.log('loading');
    if ($(anchor).attr('class').split(' ').indexOf('gallery') != -1) {
      anchor += '_1';
    } else {
      // Hackish a bit here, for some reason, your modal handler uses "a" tags to trigger event.
      // the box is exactly the same size, but the click event doens't propagate...
      // #ThisIsWhyIHateJavascript
      $(anchor + ' > a').click();
      console.log("click happened");
      return true;
    }
  } 
  if (anchor.indexOf('_') != -1) {
    // Handle galleries
    console.log(anchor)
    anchor = anchor.split('_');
    galleryId = anchor[0];
    galleryNum = anchor[1];
    if (isNaN(galleryNum) || galleryNum < 1) {
      galleryNum = 1;
    }
    if ($(galleryId).attr('class') && $(galleryId).attr('class').split(' ').indexOf('gallery') != -1) {
      $(galleryId).magnificPopup('open', galleryNum - 1)
      console.log(galleryId);
      console.log(galleryNum);
    }
    console.log('gallery opened');
    return true;
  }
}

// END ADDED CODE //
// ▕▔╲┊┊┊┊┊┊┊╱▔▏┊┊┊
// ┊╲╱╲┊┊┊┊┊╱╲╱┊┊┊┊
// ┊┊╲┈╲▂▂▂╱┈╱┊┊┊╱╲
// ┊┊╱┈┈┈┈┈┈┈╲┊┊╱┈┈╲
// ┊┊▏▕▆▍▂▕▆▍▕┊╱┈┈┈╱
// ┊▕╭╮┈┳┻┳┈╭╮▏╲┈┈╱
// ┊┊╲╯┈╰━╯┈╰╱┊╱┈┈╲
// ┊┊╱┈┈┈┈┈┈┈╲┊╲┈┈┈╲
// ┊▕╲┈▕┈┈┈▏┈╱▏┊╱┈╱
// ┊▕┈▔▔┈┈┈▔▔┈▏╱┈╱┊
// ┊▕┈┈┈┈┈┈┈┈▕▔┈╱┊┊
// ┈┈╲┈┈┈┈┈┈┈╱▔▔┈┈┈
// ┈┈▕▂╱▔▔▔╲▂▏┈┈┈┈┈
///////////////////////////////////////////////////////////////////////////

// Just a small thing, afterPageLoad makes sure that the anchor code to figure out where to go runs first
// so that your webpage doesn't go wonky.

  // REMEBER TO REPLACE THIS WITH THE CODE FROM ABOVE WHEN YOU UNDERSTAND IT.
  $(window).on('scroll', function() {
    // Make sure each one of your sections has the 'section' class.  I added it in myself
    // in your html file, but you need to do it for your html file.
    // This code basically checks each section to determine if it's in view and then 
    // changes the url as a result.
    $(".section").each(function (idx, el) {
      if ( isElementInViewport(el) ) {
        // You could theoretically remove the '#', but you need
        // to then handle page load via javascript (so that you can just jump to a section).
        // I'll leave that up to you to try to figure out. :)

        // Here's that code snippet I explained above.
        if (window.history.pushState) {
          var urlHash = "#" + $(el).attr("id");
          window.history.pushState(null, null, urlHash);
        }
      }
    });
  });  
  console.log("page load happened");

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
      || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
         if (target.length) {
           $('html,body').animate({
               scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });

  var scrollAmount1 = $(".section-home").outerHeight();

  $( window ).resize(function() {
  scrollAmount1 = $(".section-home").outerHeight();
  console.log(scrollAmount1);
  });

  var iPhone5 = 568
  var iPhone6 = 667
  var iPhone6p = 736

  $(window).on('scroll', function(){

  if($(window).innerHeight()>iPhone6p){
    if($(window).scrollTop()>=scrollAmount1 && !$('nav').hasClass('fixed')){
      $('nav').addClass('fixed'); 
    }
    else if($(window).scrollTop()<scrollAmount1 && $('nav').hasClass('fixed')){
       $('nav').removeClass('fixed') 
    }
  }
  else if ($(window).innerHeight()>iPhone6){
      if($(window).scrollTop()>=scrollAmount1 && !$('nav').hasClass('fixed')){
      $('nav').addClass('fixed'); 
    }
    else if($(window).scrollTop()<scrollAmount1 && $('nav').hasClass('fixed')){
       $('nav').removeClass('fixed') 
    }
  }
  else if ($(window).innerHeight()>iPhone5){
      if($(window).scrollTop()>=scrollAmount1 && !$('nav').hasClass('fixed')){
      $('nav').addClass('fixed'); 
    }
    else if($(window).scrollTop()<scrollAmount1 && $('nav').hasClass('fixed')){
       $('nav').removeClass('fixed') 
    }
  }
  else if ($(window).innerHeight()<=iPhone5){
    if($(window).scrollTop()>=scrollAmount1 && !$('nav').hasClass('fixed')){
      $('nav').addClass('fixed'); 
    }
    else if($(window).scrollTop()<scrollAmount1 && $('nav').hasClass('fixed')){
       $('nav').removeClass('fixed') 
    }
  }

  });
// Ready Start From Here
$(document).ready(function() {

    $('.banner-section .banner-in a[href*="#"]').on('click', function(e) {
  e.preventDefault()

  $('html, body').animate(
    {
      scrollTop: $($(this).attr('href')).offset().top - $('.header-section').height()
    },
    500,
    'linear'
  )
})


    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).scroll(function() {

        if ($('.resume-section').isInViewport()) {
            $('body').addClass('animation-show');
        } else {
            $('body').removeClass('animation-show');
        }

        // Sticky Header On Scroll
        var scroll = $(window).scrollTop();

        if (scroll >= 150) {
            $(".header-section").addClass("sticky");
        } else {
            $(".header-section").removeClass("sticky");
        }

    });

    $(".barfiller").each(function() {
        $(this).barfiller();
    });

    // Responsive Menu
    if (window.matchMedia("(max-width: 767px)").matches) {

        // $(".resume-section .resume-in .sidebar").append('<div class="close-btn"><img src="images/internet.svg"></div>');
        // $(".resume-section .resume-in .sidebar").appendTo(document.body);
        // $('.close-btn, .sidebar ul li a').click(function() {
        //     $('.sidebar').toggleClass('showhide');
        // });

        $('.header-section .header-in .menu ul').before('<div class="mobile-trigger"><i></i></div>');
        $('.menu ul li:has(ul)').addClass("submenu");
        $('.submenu > a').after('<div class="child-trigger"><i></i></div>');
        $('.mobile-trigger').click(function() {
            $(this).next('ul').slideToggle(250);
            $('body').toggleClass('mobile-open');
            $('.child-trigger').removeClass('child-open');
            $('li.submenu > ul').slideUp(250);
            return false;
        });
        $('.child-trigger').click(function() {
            $(this).parent().siblings('li').find('.child-trigger').removeClass('child-open');
            $(this).parent().siblings('li').find('ul').slideUp(250);
            $(this).toggleClass('child-open');
            $(this).next('ul').slideToggle(250);
            return false;
        });
        $('.menu ul li a').click(function() {
            $(this).parents('ul').slideUp(250);
            $('body').removeClass('mobile-open');
        });
    }

    // Scroll To Perticular Section At Top
    var sections = $('.sections'),
        nav = $('.header-section .menu'),
        header_height = nav.outerHeight();

    $(window).on('scroll', function() {
        var cur_pos = $(this).scrollTop();

        sections.each(function() {
            var top = $(this).offset().top - $('.header-section').outerHeight(),
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');

                var text = nav.find('a[href="#' + $(this).attr('id') + '"]').text();
                $('.text').text(text)

            }
        });
    });

    nav.find('a').on('click', function() {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - $('.header-section').outerHeight()
        }, 800);

        return false;
    });

    // Scroll To Perticular Section At Top
    var sections_new = $('.sectionss'),
        nav_new = $('.sidebar'),
        header_height_new = nav.outerHeight();

    $(window).on('scroll', function() {
        var cur_pos_new = $(this).scrollTop();

        sections_new.each(function() {
            var top = $(this).offset().top - header_height_new,
                bottom = top + $(this).outerHeight();

            if (cur_pos_new >= top && cur_pos_new <= bottom) {
                nav_new.find('a').removeClass('active');
                sections_new.removeClass('active');

                $(this).addClass('active');
                nav_new.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');

                var text = nav_new.find('a[href="#' + $(this).attr('id') + '"]').text();
                $('.text').text(text)

            }
        });
        setTimeout(function(){ 
         equalheight('.contact-us .main-box .box .inner span');
        }, 1300);
    });

    nav_new.find('a').on('click', function() {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - header_height_new
        }, 800)

        return false;
    });


});

$(window).resize(function(){
  equalheight('.contact-us .main-box .box .inner span');
});
    
$(window).load(function() {
  setTimeout(function(){ 
     equalheight('.contact-us .main-box .box .inner span');
   }, 1300);
 
});

equalheight = function(container) {

    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function() {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}
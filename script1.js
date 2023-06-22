$(document).ready(function () {
  if (window.matchMedia("(max-width: 767px)").matches) {
    $(".header-section .header-in").before(
      '<div class="mobile-trigger"><i></i></div>'
    );
    $(".menu ul li:has(ul)").addClass("submenu");
    $(".submenu > a").after('<div class="child-trigger"><i></i></div>');
    $(".mobile-trigger").click(function () {
      $(this).next("ul").slideToggle(250);
      $("body").toggleClass("mobile-open");
      $(".child-trigger").removeClass("child-open");
      $("li.submenu > ul").slideUp(250);
      return false;
    });
    $(".child-trigger").click(function () {
      $(this)
        .parent()
        .siblings("li")
        .find(".child-trigger")
        .removeClass("child-open");
      $(this).parent().siblings("li").find("ul").slideUp(250);
      $(this).toggleClass("child-open");
      $(this).next("ul").slideToggle(250);
      return false;
    });
  }

  $(function () {
    $('.header-section a[href*="#"]:not([href="#"])').click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop:
                target.offset().top - $(".header-section").outerHeight(),
            },
            1000
          );

          return false;
        }
      }
    });
  });

  $(function () {
    $('.side-menu a[href*="#"]:not([href="#"])').click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          var s =
            $(".resume-section").outerHeight() -
            $(".resume-section .wrapper").outerHeight() -
            $(".header-section").outerHeight();
          console.log(s);
          $("html, body").animate(
            {
              scrollTop:
                target.offset().top - $(".header-section").outerHeight() - s,
            },
            1000
          );

          return false;
        }
      }
    });
  });

  $(".mobile-trigger").click(function () {
    $("body").toggleClass("open");
  });

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 150) {
      $(".header-section").addClass("sticky");
    } else {
      $(".header-section").removeClass("sticky");
    }
  });

  leftpadding();
  rightpadding();

});

/***** Equal Height Js *****/

$(window).on("load resize", function () {
  equalheight("");
});

$(window).resize(function () {
  equalheight("");

  leftpadding();
  rightpadding();
});

equalheight = function (container) {
  var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;
  $(container).each(function () {
    $el = $(this);
    $($el).height("auto");
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
      currentTallest =
        currentTallest < $el.height() ? $el.height() : currentTallest;
    }
    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
      rowDivs[currentDiv].height(currentTallest);
    }
  });
};

/*Js For Left And Right Padding Using Jquery*/

/* left padding */
function leftpadding() {
  var finalleftpadding =
    (jQuery(window).width() - jQuery(".wrapper").width()) / 2;
  jQuery(".leftpadding").css("padding-left", finalleftpadding);
}

function rightpadding() {
  var finalrightpadding =
    (jQuery(window).width() - jQuery(".wrapper").width()) / 2;
  jQuery(".rightpadding").css("padding-right", finalrightpadding);
}

/***** Tabbing Js *****/
$(".tabbing-section").each(function (t, i) {
  ($target = $(this)),
    $(".tabbing-contain", $target).before(
      '<div class="tabbing-list"><ul></ul</div>'
    ),
    $target.find(".tab-acc-title").each(function (t) {
      var i = "<li>" + $(this).html() + "</li>";
      $target.find(".tabbing-list ul").append(i);
    });
}),
  $(".tabbing-list ul li").each(function (t, i) {
    $(this)
      .find("a")
      .attr("href", "#tab-id-" + t),
      $(this).attr("data-list", "tab-title-" + t);
  }),
  $(".single-tab").each(function (t, i) {
    $(this)
      .find(".tab-contain")
      .attr("id", "tab-id-" + t),
      $(this)
        .find(".tab-acc-title")
        .attr("data-tab", "tab-title-" + t);
  }),
  $(".tabbing-section").each(function () {
    ($this = $(this)),
      $this.find(".single-tab .tab-contain").hide(),
      $this.find(".tabbing-list ul li:first").addClass("active"),
      $this.find(".single-tab:first .tab-contain").show(),
      $this.find(".single-tab:first .tab-acc-title").addClass("active");
  }),
  $(".tabbing-list ul li").click(function () {
    var t = $(this).parentsUntil(".tabbing-section").parent(),
      i = $(this).find("a").attr("href"),
      a = $(i).parent(".single-tab").siblings(),
      n = $(i).parent(".single-tab");

    return (
      $(".tab-acc-title", a).removeClass("active"),
      $(".tab-acc-title", n).addClass("active"),
      $("li", t).removeClass("active"),
      $(this).addClass("active"),
      $(".tab-contain", t).hide(),
      $(i).fadeIn(),
      !1
    );
  }),
  $(".single-tab .tab-acc-title").click(function () {
    var t = $(this).parents(".tabbing-section");
    $(t).find(".tabbing-list ul li").removeClass("active");
    var i = $(this).attr("data-tab");
    $(".tabbing-list ul li", t).removeClass("active"),
      $(".tabbing-list ul li[data-list=" + i + "]").addClass("active");
    var a = $(this),
      n = $(this).parent().siblings();
    $(this).parent(),
      $(this).next(".tab-contain").slideDown(),
      $(".tab-contain", n).slideUp(),
      $(".tab-acc-title", n).removeClass("active"),
      a.addClass("active");
  });

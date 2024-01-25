/*!
    * Start Bootstrap - Freelancer v6.0.0 (https://startbootstrap.com/themes/freelancer)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-freelancer/blob/master/LICENSE)
    */
    (function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 71)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });


    $(document).ready(function(){
      $("#but-lang").click(function(){
      $("#Languages").show();
      $("#Frameworks").hide();
      $("#Other").hide();
      $("#Databases").hide();
      });
      $("#but-frame").click(function(){
      $("#Languages").hide();
      $("#Frameworks").show();
      $("#Other").hide();
      $("#Databases").hide();
      });
      $("#but-db").click(function(){
      $("#Languages").hide();
      $("#Frameworks").hide();
      $("#Other").hide();
      $("#Databases").show();
      });
      $("#but-oth").click(function(){
      $("#Languages").hide();
      $("#Frameworks").hide();
      $("#Other").show();
      $("#Databases").hide();
      });
      });
        window.addEventListener("DOMContentLoaded", function() {
          
          var form = document.getElementById("my-form");
          var button = document.getElementById("my-form-button");
          var status = document.getElementById("my-form-status");
          
          function success() {
            form.reset();
            button.style = "display: none ";
            status.innerHTML = "Thanks!";
          }
      
          function error() {
            status.innerHTML = "Oops! There was a problem.";
          }
      
          form.addEventListener("submit", function(ev) {
            ev.preventDefault();
            var data = new FormData(form);
            ajax(form.method, form.action, data, success, error);
          });
        });
        function ajax(method, url, data, success, error) {
          var xhr = new XMLHttpRequest();
          xhr.open(method, url);
          xhr.setRequestHeader("Accept", "application/json");
          xhr.onreadystatechange = function() {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
              success(xhr.response, xhr.responseType);
            } else {
              error(xhr.status, xhr.response, xhr.responseType);
            }
          };
          xhr.send(data);
        }
      



  
    // Scroll to top button appear
    $(document).scroll(function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 80
    });
  
    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  
    // Floating label headings for the contact form
    $(function() {
      $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
    });
  
  })(jQuery); // End of use strict
  




  var scroller = 0;
var menuStatus = false;
var scrollabout;
var elements = document.getElementsByClassName("portfolio__animation");

const topMenu = document.querySelector(".top-menu");
const menuToggle = document.querySelector(".menu-toggle");
const logo = document.querySelector(".header__logo");
const menuHome = document.querySelector("#menu-home");
const menuAbout = document.querySelector("#menu-about");
const menuPortfolio = document.querySelector("#menu-portfolio");
const menuContact = document.querySelector("#menu-contact");
const aside = document.querySelector(".aside");

const homeSelector = document.querySelector(".home");
const portfolio = document.querySelector(".portfolio");
const contact = document.querySelector(".contact");
const aboutSelector = document.querySelector(".about");

const body = document.querySelector("body");

function r(f) {
  /in/.test(document.readyState) ? setTimeout("r(" + f + ")", 9) : f();
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top + 500>= 0 &&
    rect.left >= 0 &&
    rect.bottom - 500<=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  var isVisible = elemTop >= 0 && elemBottom - 500 <= window.innerHeight;
  return isVisible;
}

function Bar() {
  var Scroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (Scroll / height) * 100;
  document.getElementById("progress-bar__fill").style.height = scrolled + "%";
}

function getElementY(query) {
  return (
    window.pageYOffset +
    document.querySelector(query).getBoundingClientRect().top
  );
}

function doScrolling(element, duration) {
  openCloseMenu(true)
  var startingY = window.pageYOffset;
  var elementY = getElementY(element);
  var targetY =
    document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : elementY;
  var diff = targetY - startingY;
  var easing = function(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  var start;
  if (!diff) return;
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    var time = timestamp - start;
    var percent = Math.min(time / duration, 1);
    percent = easing(percent);
    window.scrollTo(0, startingY + diff * percent);
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}
if (document.getElementById("home-btn")) {
  document
    .getElementById("home-btn")
    .addEventListener("click", doScrolling.bind(null, "#aboutsection", 1000));
}
function openCloseMenu(closedMenu) {
  if (!menuStatus && !closedMenu) {
    body.style.overflow = "hidden";
    topMenu.classList.add("active");
    menuStatus = true;
    menuToggle.classList.toggle("active");
  } else {
    body.style.overflowY = "auto";
    menuStatus = false;
    menuToggle.classList.remove("active");
    topMenu.classList.remove("active");
  }
}
r(function() {
  //*******************************************************
  //***                     FORM                        ***
  //*******************************************************

  var nameval = false,
    emailval = false,
    textval = false,
    thanks = false;
  if (document.getElementById("form")) {
    document.getElementById("form").action = "";
  }

  var regex = new RegExp(
    '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|' +
      '(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])' +
      "|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
  );
  if (document.querySelector(".form__input.email input")) {
    document
      .querySelector(".form__input.email input")
      .addEventListener("keyup", function() {
        this.parentElement.classList.toggle("success", regex.test(this.value));
        if (
          regex.test(document.querySelector(".form__input.email input").value)
        ) {
          emailval = true;
        } else {
          emailval = false;
        }
      });

    document
      .querySelector(".form__input.name input")
      .addEventListener("keyup", function() {
        this.parentElement.classList.toggle("success", this.value.length > 2);
        if (
          document.querySelector(".form__input.name input").value.length > 2
        ) {
          nameval = true;
        } else {
          nameval = false;
        }
      });

    document
      .querySelector(".form__input.textarea textarea")
      .addEventListener("keyup", function() {
        this.parentElement.classList.toggle("success", this.value.length > 10);
        if (
          document.querySelector(".form__input.textarea textarea").value
            .length > 10
        ) {
          textval = true;
        } else {
          textval = false;
        }
      });

    document.querySelector("#form").addEventListener("submit", function(e) {
      if (!emailval || !nameval || !textval) {
        e.preventDefault();
      }
      if (!emailval) {
        document.querySelector(".form__input.email input").style.border =
          "1px solid #ef233c";
      } else {
        document.querySelector(".form__input.email input").style.border =
          "none";
      }
      if (!nameval) {
        document.querySelector(".form__input.name input").style.border =
          "1px solid #ef233c";
      } else {
        document.querySelector(".form__input.name input").style.border = "none";
      }
      if (!textval) {
        document.querySelector(".form__input.textarea textarea").style.border =
          "1px solid #ef233c";
      } else {
        document.querySelector(".form__input.textarea textarea").style.border =
          "none";
      }
      if (nameval && emailval && textval) {
        document.getElementById("form").action =
          "https://getsimpleform.com/messages?form_api_token=d55de506b28707f8ee113a4e3e6c1539";
        thanks = true;
        return true;
      }
      return false;
    });
  }

  //*******************************************************
  //***               CHECK HASH                        ***
  //*******************************************************

  if (window.location.hash === "#about") {
    doScrolling("#aboutsection", 1000);
  } else if (window.location.hash === "#contact") {
    doScrolling("#contactsection", 1000);
  }
  if (window.location.hash === "#contactthanks") {
    doScrolling("#contactsection", 1000);
    document.getElementById("thank-you-message").className = "none";
  }

  //*******************************************************
  //***             CHECK IF ELEMENTS VISIBLE           ***
  //*******************************************************

  for (let i = 0; i < elements.length; i++) {
    if (isElementInViewport(elements[i])) {
      elements[i].style.width = 0;
    }
  }

  //*******************************************************
  //***                     MENU                        ***
  //*******************************************************

  menuToggle.addEventListener("click", function() {
    openCloseMenu()
  });
  document
    .getElementById("menu-home")
    .addEventListener("click", doScrolling.bind(null, "#homesection", 1000));
  document
    .getElementById("menu-about")
    .addEventListener("click", doScrolling.bind(null, "#aboutsection", 1000));
  if (window.location.pathname.split("/").pop() === "portfolio.html") {
    document
      .getElementById("menu-portfolio")
      .addEventListener(
        "click",
        doScrolling.bind(null, "#portfoliosection", 1000),
      );
  }
  document
    .getElementById("menu-contact")
    .addEventListener("click", doScrolling.bind(null, "#contactsection", 1000));

  //*******************************************************
  //***         SHOW ELEMENTS ON SCROLL                ***
  //*******************************************************

  window.onscroll = function() {
    for (let i = 0; i < elements.length; i++) {
      if (isScrolledIntoView(elements[i])) {
        elements[i].style.width = "0";
      }
    }
    Bar();
  };
});

 
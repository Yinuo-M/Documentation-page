$(document).ready(initiate);

function initiate() {
  //ANCHOR selection
  const $window = $(window);

  const $navBar = $(".navbar");
  const $main = $("#main-wrapper");
  const $filter = $(".filter");
  const $footer = $("footer");

  const $toggleButton = $(".toggle");
  const $collapseButton = $(".collapse-button");
  const $backToTopButton = $(".back-to-top");

  //ANCHOR functions
  function stickyScroll() {
    const bannerRect = $("#intro")[0].getBoundingClientRect();
    const scrollTop = $window.scrollTop();

    if (scrollTop > 0 && scrollTop < bannerRect.height) {
      $navBar.css("top", bannerRect.height - scrollTop);
    } else if (scrollTop >= bannerRect.height) {
      $navBar.css("top", 0);
    } else {
      $navBar.css("top", bannerRect.height);
    }
  }

  function highlightNav() {
    const $sections = $(".main-section");
    let highlightTarget;

    if ($window.height() + $window.scrollTop() >= $(document).height()) {
      highlightTarget = $sections.eq($sections.length - 1);
    } else {
      for (let section of $sections) {
        if (section.getBoundingClientRect().bottom < 20) continue;
        highlightTarget = section;
        break;
      }
    }

    const $link = $(`[href*=${highlightTarget.id}]`);
    highlight($link);
  }

  function highlight($elem) {
    if ($elem.hasClass("highlighted")) return;

    const prev = $(".highlighted");
    if (prev.length) prev.removeClass("highlighted");

    $elem.addClass("highlighted");
  }

  function toggleNav() {
    if ($navBar.css("opacity") === "0") {
      openNav();
    } else {
      closeNav();
    }
  }

  function openNav() {
    $navBar.addClass("show");
    $(document).css("overflow", "hidden");
    $filter.css("zIndex", "10");
    $collapseButton.fadeIn();
  }

  function closeNav() {
    $navBar.removeClass("show");
    $(document).css("overflow", "visible");
    $filter.css("zIndex", "-1000");
    $collapseButton.fadeOut();
  }

  function goToSection(e) {
    if ($navBar.css("opacity") === "0") return;
    if ($window.width() > 810) return;
    if (!e.target.closest(".nav-link")) return;
    toggleNav();
  }

  function scrollToTop() {
    smoothScroll(0);
  }

  function smoothScroll(y) {
    let timerId;
    smallScroll();

    function smallScroll() {
      const distance = $window.scrollTop() - y;

      if (distance <= 10) {
        clearTimeout(timerId);
        window.scrollBy(0, -distance);
        return;
      }

      if (distance <= 150) {
        window.scrollBy(0, -10);
        timerId = setTimeout(smallScroll, 5);
        return;
      }

      if (distance <= 400) {
        window.scrollBy(0, -20);
        timerId = setTimeout(smallScroll, 0.1);
        return;
      }

      window.scrollBy(0, -50);
      timerId = setTimeout(smallScroll, 0.01);
    }
  }

  function fixBackToTopButton() {
    if ($window.width() > 810) return;

    const buttonBottom = $backToTopButton[0].getBoundingClientRect().bottom;
    const footerTop = $footer[0].getBoundingClientRect().top;
    const rem = parseInt($("html").css("fontSize"));

    if (footerTop - buttonBottom < rem) {
      $backToTopButton.css("position", "absolute");
      return;
    }

    if ($window.height() - buttonBottom < rem) {
      $backToTopButton.css("position", "fixed");
    }
  }

  //ANCHOR add event listeners
  $window
    .on("scroll", stickyScroll)
    .on("scroll", highlightNav)
    .on("scroll", fixBackToTopButton);

  $navBar.on("click", goToSection);

  $toggleButton.on("click", toggleNav);
  $collapseButton.on("click", closeNav);
  $backToTopButton.on("click", scrollToTop);
}

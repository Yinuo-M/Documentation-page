let navBar = document.querySelector(".navbar");
let main = document.querySelector("#main-wrapper");
let filter = document.querySelector(".filter");

let toggleButton = document.querySelector(".toggle");
let collapseButton = document.querySelector(".collapse-button");
let backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", stickyScroll);
window.addEventListener("scroll", highlightNav);
window.addEventListener("scroll", fixBackToTopButton);

navBar.onclick = goToSection;

toggleButton.addEventListener("click", toggleNav);
collapseButton.onclick = closeNav;
backToTopButton.onclick = scrollToTop;

function stickyScroll() {
	let bannerRect = document.getElementById("intro").getBoundingClientRect();

	if (window.pageYOffset > 0 && window.pageYOffset < bannerRect.height) {
		navBar.style.top = bannerRect.height - window.pageYOffset + "px";
	} else if (window.pageYOffset >= bannerRect.height) {
		navBar.style.top = 0;
	} else {
		navBar.style.top = bannerRect.height + "px";
	}
}

function highlightNav() {
	let sections = document.querySelectorAll(".main-section");

	let documentHeight = Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.offsetHeight,
		document.body.clientHeight,
		document.documentElement.clientHeight
	);

	let highlightTarget;

	if (
		document.documentElement.clientHeight + window.pageYOffset >=
		documentHeight
	) {
		highlightTarget = sections[sections.length - 1];
	} else {
		for (let section of sections) {
			if (section.getBoundingClientRect().bottom < 20) continue;
			highlightTarget = section;
			break;
		}
	}

	let link = document.querySelector(`[href*=${highlightTarget.id}]`);
	highlight(link);
}

function highlight(elem) {
	if (elem.classList.contains("highlighted")) return;

	let prev = document.querySelector(".highlighted");
	if (prev) prev.classList.remove("highlighted");

	elem.classList.add("highlighted");
}

function resetNav() {
	if (document.documentElement.clientWidth > 810) {
		navBar.classList.remove("show");
		document.body.style.overflow = "visible";
		filter.style.zIndex = -1000;
		collapseButton.style.display = "none";

		window.resize = null;
	}
}

function toggleNav() {
	if (window.getComputedStyle(navBar).opacity === "0") {
		openNav();
	} else {
		closeNav();
	}

	if (!window.onresize) window.onresize = resetNav;
}

function openNav() {
	navBar.classList.add("show");
	document.body.style.overflow = "hidden";
	filter.style.zIndex = 10;
	collapseButton.style.display = "block";
}

function closeNav() {
	navBar.classList.remove("show");
	document.body.style.overflow = "visible";
	filter.style.zIndex = -1000;
	collapseButton.style.display = "none";
}

function goToSection(event) {
	if (window.getComputedStyle(navBar).opacity === "0") return;
	if (document.documentElement.clientWidth > 810) return;
	if (!event.target.closest(".nav-link")) return;
	toggleNav();
}

function scrollToTop() {
	smoothScroll(0);
}

function smoothScroll(y) {
	let timerId;
	smallScroll();

	function smallScroll() {
		let distance = window.pageYOffset - y;

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
	if (document.documentElement.clientWidth > 810) return;

	let buttonBottom = backToTopButton.getBoundingClientRect().bottom;
	let footerTop = document.querySelector("footer").getBoundingClientRect().top;
	let rem = parseInt(
		window.getComputedStyle(document.documentElement)["font-size"]
	);

	if (footerTop - buttonBottom < rem) {
		backToTopButton.style.position = "absolute";
		return;
	}

	if (document.documentElement.clientHeight - buttonBottom < rem) {
		backToTopButton.style.position = "fixed";
	}
}

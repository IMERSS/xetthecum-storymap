"use strict";

// Resolve https://github.com/IMERSS/xetthecum-storymap/issues/34 by querying breadcrumb status and updating nav
// status to match

const breadholder = document.querySelector(".quarto-page-breadcrumbs")
if (breadholder) {
    const breadcrumbs = [...breadholder.querySelectorAll(".breadcrumb-item a")];
    const texts = breadcrumbs.map(a => a.innerText).map(text => text.trim());

    const navholder = document.querySelector(".navbar-nav");
    const navLinks = [...navholder.querySelectorAll(".nav-item .nav-link")];

    navLinks.forEach(navLink => {
        const linkText = navLink.innerText.trim();
        const inCrumbs = texts.includes(linkText);
        if (inCrumbs) {
            // Status taken from https://github.com/quarto-dev/quarto-cli/blob/238afdba64f60e93970b985bfb222413f0d46811/src/project/types/website/website-navigation.ts#L565
            navLink.classList.add("active");
            navLink.setAttribute("aria-current", "page");
        }
    });
}

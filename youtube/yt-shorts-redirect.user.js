// ==UserScript==
// @name         Youtube shorts redirect
// @description  Redirects YouTube shorts to the watch page
// @namespace    ViolentMonkey Scripts
// @version      0.1
// @match        *://*.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
let oldHref = document.location.href;
if (window.location.href.indexOf('youtube.com/shorts') > -1) {
    window.location.replace(window.location.toString().replace('/shorts/', '/watch?v='));
}

function shortsRedirector() {
  if (oldHref != document.location.href) {
    oldHref = document.location.href;
    if (window.location.href.indexOf('youtube.com/shorts') > -1) {
       window.location.replace(window.location.toString().replace('/shorts/', '/watch?v='));
    }
  }
}
window.addEventListener("yt-navigate-finish", shortsRedirector, true);

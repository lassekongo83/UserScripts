// ==UserScript==
// @name         Twitter to nitter
// @namespace    null
// @version      0.1
// @description  Redirect twitter to nitter
// @match        https://twitter.com/*
// @run-at       document-start
// ==/UserScript==

redirectToPage("https://twitter.com", "https://nitter.net");

function redirectToPage(page1, page2) {
  if(window.location.href.indexOf(page1) != -1) {
    window.location.href = page2 + window.location.pathname;
  }
}

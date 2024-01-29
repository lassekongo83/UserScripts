// ==UserScript==
// @name              Redirect x.com to Nitter
// @namespace         ViolentMonkey Scripts
// @description       Redirect X to Nitter
// @include           https://x.com/*
// @include           https://twitter.com/*
// @run-at            document-start
// @grant             none
// ==/UserScript==

window.location.replace("https://farside.link/nitter" + window.location.pathname + window.location.search);

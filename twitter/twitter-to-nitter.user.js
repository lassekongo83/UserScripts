// ==UserScript==
// @name              Redirect x.com to Nitter
// @namespace         ViolentMonkey Scripts
// @description       Redirect X to Nitter
// @include           https://x.com/*
// @include           https://twitter.com/*
// @run-at            document-start
// @grant             none
// ==/UserScript==

// nitter.net can also be replaced by https://farside.link/nitter to get a random working nitter instance
window.location.replace("https://nitter.net" + window.location.pathname + window.location.search);

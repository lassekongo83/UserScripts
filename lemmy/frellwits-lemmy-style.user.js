// ==UserScript==
// @name        Frellwit's Lemmy Style
// @namespace   https://github.com/lassekongo83/UserScripts/lemmy
// @description A userstyle for Lemmy inspired by the old reddit design
// @version     0.1
// @author      Frellwit on lemmy.world
// @updateURL   https://github.com/lassekongo83/UserScripts/raw/main/lemmy/frellwits-lemmy-style.user.js
// @downloadURL https://github.com/lassekongo83/UserScripts/raw/main/lemmy/frellwits-lemmy-style.user.js
// @match       https://*/*
// ==/UserScript==
(function() {
  'use strict';

  var isLemmy;
  try {
    isLemmy = document.head.querySelector("[name~=Description][content]").content === "Lemmy";
  } catch (_er) {
    isLemmy = false;
  }

  if (isLemmy) {
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDarkTheme) {
      var bodyFontColor = "#fff";
      var bodyBGcolor = "#222";
      var secondaryBGcolor = "#555";
      var cardShadow = "0 0 0 1px rgba(255,255,255,0.14)"
      var thumbLinkBG = "rgba(255,255,255,0.18)"
    } else { // Light theme
      var bodyFontColor = "#222";
      var bodyBGcolor = "#eee";
      var secondaryBGcolor = "#fff";
      var cardShadow = "0 1px 4px 0 rgba(0,0,0,0.14)"
      var thumbLinkBG = "#d2dbe0"
    }

    const css = `
      /***********/
      /* GLOBALS */
      /***********/
      :root {
        --bs-body-color: `+bodyFontColor+` !important;
        --bs-font-sans-serif: verdana,arial,helvetica,sans-serif !important;
        --bs-body-font-size: 1rem !important;
      }
      /**********/
      /* COLORS */
      /**********/
      body {
        background-color: `+bodyBGcolor+` !important;
      }
      #navbar, .post-listings, #postContent, div > ul.comments > .comment {
        background-color: `+secondaryBGcolor+` !important;
      }
      .card {
        --bs-card-bg: `+secondaryBGcolor+` !important;
      }
      /*********/
      /* SIZES */
      /*********/
      .home, .post, .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container, #navbar {
        max-width: 100% !important;
      }
      .col-md-8 { /* Main content */
        flex: 0 0 80% !important;
        width: 80% !important;
      }
      .col-md-4 { /* Sidebar */
        flex: 0 0 20% !important;
        width: 20% !important;
        padding-left: 0 !important;
      }
      .vote-bar {
        min-width: 50px !important;
      }
      .md-div, .comment-form {
        max-width: 60em !important;
      }
      /****************************/
      /* FONT SIZES & TEXT COLORS */
      /****************************/
      .post-title h5 {
        font-size: medium !important;
      }
      a > span.fst-italic {
        color: var(--bs-orange) !important;
      }
      .comment .md-div, .card .md-div {
        font-size: .85rem !important;
      }
      .post-listings .post-title ~ .small {
        font-size: x-small !important;
      }
      /****************************/
      /* POST LISTINGS & COMMENTS */
      /****************************/
      .post-listings {
        box-shadow: `+cardShadow+` !important;
        padding: .85rem !important;
        border-radius: var(--bs-border-radius) !important;
      }
      div > ul.comments > .comment {
        box-shadow: `+cardShadow+` !important;
        padding: 0 .85rem !important;
        margin-bottom: 8px !important;
        padding-bottom: .85rem !important;
        border-radius: var(--bs-border-radius) !important;
      }
      div > ul.comments > .comment > .comments .comment {
        margin-left: .85rem !important;
      }
      div > ul.comments > li.comment > article.border-top, div > ul.comments.border-top {
        border-top: none !important;
      }
      .post-listing + hr.my-3 {
        margin-right: -.85rem !important;
        margin-left: -.85rem !important;
      }
      .post-listing + hr:only-child, .post-listing + hr:last-child {
        display: none !important;
      }
      /* Thumbnails */
      button.thumbnail.rounded,
      button.thumbnail.rounded img.rounded {
        border-radius: 0 !important;
      }
      .post-listing button.thumbnail.p-0,
      .post-listing .px-0 {
        max-width: 70px !important;
        max-height: 70px !important;
        min-width: 70px !important;
        min-height: 70px !important;
      }
      .post-listing .px-0 {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
      }
      a[href^="/post/"] .thumbnail,
      a.text-body[rel="noopener nofollow"] .thumbnail {
        background-color: `+thumbLinkBG+` !important;
        color: white !important;
        border-radius: 100% !important;
        border: none !important;
        min-width: 50px !important;
        min-height: 50px !important;
        max-width: 50px !important;
        max-height: 50px !important;
      }
      a.thumbnail[rel="noopener nofollow"]:not([href^="/"]) img.rounded {
        border-radius: 100% !important;
      }
      /********/
      /* MISC */
      /********/
      img.slight-radius {
        border-radius: 0 !important;
      }
      .banner-icon-header {
        max-width: unset !important;
      }
      .card {
        box-shadow: `+cardShadow+` !important;
        border: none !important;
      }
      .card.border-secondary {
        border: none !important;
      }
      /* Let's make some social media links be their brand accent color */
      a[href*="youtu.be"],
      a[href*="youtube.com"] {
        color: rgba(255,0,0,0.5) !important;
      }
      a[rel="noopener nofollow"][href*="youtube.com"] .thumbnail,
      a[rel="noopener nofollow"][href*="youtu.be"] .thumbnail {
        background-color: #ff6767 !important;
        color: white !important;
      }
      a[rel="noopener nofollow"][href*="facebook.com"] .thumbnail {
        background-color: #4267B2 !important;
        color: white !important;
      }
      a[rel="noopener nofollow"][href*="/t.co"] .thumbnail,
      a[rel="noopener nofollow"][href*="/twitter.com"] .thumbnail {
        background-color: #1DA1F2 !important;
        color: white !important;
      }
      a[rel="noopener nofollow"][href*="streamable.com"] .thumbnail {
        background-color: #1090fa !important;
        color: white !important;
      }
      a[rel="noopener nofollow"][href*="twitch.tv"] .thumbnail {
        background-color: #6441a5 !important;
        color: white !important;
      }
    `
    const styleTag = document.createElement('style');
    styleTag.appendChild(document.createTextNode(css));
    document.head.appendChild(styleTag);
  }

})();

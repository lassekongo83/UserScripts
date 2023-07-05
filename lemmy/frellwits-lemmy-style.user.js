// ==UserScript==
// @name        Frellwit's Lemmy Style
// @namespace   https://github.com/lassekongo83/UserScripts/lemmy
// @description A userstyle for Lemmy inspired by the old reddit design
// @version     0.3
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
    // Would want a better way to detect if litely or darkly is used
    // but for now I assume that the user isn't using a light system with a dark website
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // dark/light
    var bodyFontColor    = (prefersDarkTheme) ? "#fff" : "#222";
    var bodyBGcolor      = (prefersDarkTheme) ? "#121317" : "#eee";
    var secondaryBGcolor = (prefersDarkTheme) ? "#1c1d21" : "#fff";
    var cardShadow       = (prefersDarkTheme) ? "inset 0 0 0 1px rgba(255,255,255,0.14)" : "0 1px 4px 0 rgba(0,0,0,0.14)";
    var thumbLinkBG      = (prefersDarkTheme) ? "rgba(255,255,255,0.18)" : "#d2dbe0";
    var thumbLinkBGhover = (prefersDarkTheme) ? "rgba(255,255,255,0.22)" : "#c6d2d8";
    var formTextareaBG   = (prefersDarkTheme) ? "#303135" : "#fff";
    var cardCapBG        = (prefersDarkTheme) ? "#26272b" : "#f9f9f9";
    // Brand colors
    var brandYouTube     = "#FF0000";
    var brandFacebook    = "#4267B2";
    var brandTwitter     = "#1DA1F2";
    var brandStreamable  = "#1090fa";
    var brandTwitch      = "#6441a5";

    const css = `
      /***********/
      /* GLOBALS */
      /***********/
      :root {
        --bs-body-bg: ${bodyBGcolor} !important;
        --bs-body-color: ${bodyFontColor} !important;
        --bs-font-sans-serif: verdana,arial,helvetica,sans-serif !important;
        --bs-body-font-size: 1rem !important;
      }
      /**********/
      /* COLORS */
      /**********/
      #navbar, .post-listings, #postContent, div > ul.comments > .comment {
        background-color: ${secondaryBGcolor} !important;
      }
      .card {
        --bs-card-bg: ${secondaryBGcolor} !important;
        --bs-card-cap-bg: ${cardCapBG} !important;
      }
      textarea.form-control, input.form-control[type="text"] {
        background-color: ${formTextareaBG} !important;
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
        box-shadow: ${cardShadow} !important;
        padding: .85rem !important;
        border-radius: var(--bs-border-radius) !important;
      }
      div > ul.comments > .comment {
        box-shadow: ${cardShadow} !important;
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
        background-color: ${thumbLinkBG} !important;
        color: white !important;
        border-radius: 100% !important;
        border: none !important;
        min-width: 50px !important;
        min-height: 50px !important;
        max-width: 50px !important;
        max-height: 50px !important;
      }
      a[href^="/post/"] .thumbnail:hover,
      a.text-body[rel="noopener nofollow"] .thumbnail:hover {
        background-color: ${thumbLinkBGhover} !important;
      }
      a.thumbnail[rel="noopener nofollow"]:not([href^="/"]) img.rounded {
        border-radius: 100% !important;
      }
      .post-listings .post-metadata-card, .post-listings article#postContent {
        border: 1px solid color-mix(in srgb, currentColor 6%, transparent) !important;
        background-color: color-mix(in srgb, currentColor 4%, transparent) !important;
        box-shadow: none !important;
      }
      /********/
      /* MISC */
      /********/
      .md-div blockquote:before {
        font-family: Georgia, serif !important;
        content: "“" !important;
        color: color-mix(in srgb, currentColor 12%, transparent) !important;
        font-size: 4em !important;
        line-height: 0.1em !important;
        margin-right: 0.1em !important;
        vertical-align: -0.4em !important;
      }
      .md-div blockquote p {
        display: inline !important;
      }
      .md-div blockquote {
        background-color: color-mix(in srgb, currentColor 4%, transparent) !important;
        border: 1px solid color-mix(in srgb, currentColor 6%, transparent) !important;
        border-radius: 4px !important;
        padding: 8px !important;
      }
      .small a:hover,
      a.text-muted.btn:hover {
        text-decoration: underline !important;
      }
      img.slight-radius:not(.rounded-circle):not(.banner) {
        border-radius: 0 !important;
      }
      .banner-icon-header {
        max-width: unset !important;
      }
      .card {
        box-shadow: ${cardShadow} !important;
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
      a[rel="noopener nofollow"][href*="youtu.be"] .thumbnail,
      a[rel="noopener nofollow"][href*="youtube.com"] .thumbnail:hover,
      a[rel="noopener nofollow"][href*="youtu.be"] .thumbnail:hover {
        background-color: ${brandYouTube} !important;
        color: white !important;
      }
      a[rel="noopener nofollow"][href*="facebook.com"] .thumbnail,
      a[rel="noopener nofollow"][href*="facebook.com"] .thumbnail:hover {
        background-color: ${brandFacebook} !important;
        color: white !important;
      }
      a[rel="noopener nofollow"][href*="/t.co"] .thumbnail,
      a[rel="noopener nofollow"][href*="/twitter.com"] .thumbnail,
      a[rel="noopener nofollow"][href*="/t.co"] .thumbnail:hover,
      a[rel="noopener nofollow"][href*="/twitter.com"] .thumbnail:hover {
        background-color: ${brandTwitter} !important;
        color: white !important;
      }
      a[rel="noopener nofollow"][href*="streamable.com"] .thumbnail,
      a[rel="noopener nofollow"][href*="streamable.com"] .thumbnail:hover {
        background-color: ${brandStreamable} !important;
        color: white !important;
      }
      a[rel="noopener nofollow"][href*="twitch.tv"] .thumbnail,
      a[rel="noopener nofollow"][href*="twitch.tv"] .thumbnail:hover {
        background-color: ${brandTwitch} !important;
        color: white !important;
      }
    `
    const styleTag = document.createElement('style');
    styleTag.appendChild(document.createTextNode(css));
    document.head.appendChild(styleTag);
  }

})();

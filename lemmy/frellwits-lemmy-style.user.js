// ==UserScript==
// @name        Frellwit's Lemmy Style
// @namespace   https://github.com/lassekongo83/UserScripts/lemmy
// @description A userstyle for Lemmy inspired by the old reddit design
// @version     0.4
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
    var primaryBackground    = (prefersDarkTheme) ? "#121317" : "#f0f0f0";
    var secondaryBackground  = (prefersDarkTheme) ? "#1c1d21" : "#fff";
    var primaryText          = (prefersDarkTheme) ? "#fff" : "#222";
    var primaryTextRGB       = (prefersDarkTheme) ? "255, 255, 255" : "13, 13, 13";
    var cardCapBackground    = (prefersDarkTheme) ? "#26272b" : "#fcfcfc";
    var cardText             = (prefersDarkTheme) ? "#fff" : "#222";
    var cardShadow           = (prefersDarkTheme) ? "inset 0 0 0 1px rgba(255,255,255,0.14)" : "0 1px 2px rgba(0,0,0,.1)";
    var thumbBackground      = (prefersDarkTheme) ? "rgba(255,255,255,0.18)" : "#d2dbe0";
    var thumbBackgroundHover = (prefersDarkTheme) ? "rgba(255,255,255,0.22)" : "#c6d2d8";
    var formBackground       = (prefersDarkTheme) ? "#26272b" : "#fff";
    var buttonBackground     = (prefersDarkTheme) ? "#303135" : "#fff";
    var buttonBorder         = (prefersDarkTheme) ? "rgba(255,255,255,0.22)" : "#c6d2d8";
    // Brand colors
    var brandYouTube         = "#FF0000";
    var brandFacebook        = "#4267B2";
    var brandTwitter         = "#1DA1F2";
    var brandStreamable      = "#1090fa";
    var brandTwitch          = "#6441a5";
    // Misc values
    var defaultSpacing       = ".85rem";  // Spacing between most elements
    var defaultFontsize      = "1rem";    // Default body font size
    var mdFontsize           = ".9rem";   // md-div aka comments and posts
    var mdLineheight         = "1.56";
    var mdMaxwidth           = "60em";
    var titleFontsize        = "medium";
    var subtitleFontsize     = "x-small"; // text below the post title
    var buttonRadius         = "4px";

    const css = `
      /***********/
      /* GLOBALS */
      /***********/
      :root {
        --bs-body-bg: ${primaryBackground} !important;
        --bs-body-color: ${primaryText} !important;
        --bs-body-color-rgb: ${primaryTextRGB} !important;
        --bs-font-sans-serif: verdana,arial,helvetica,sans-serif !important;
        --bs-body-font-size: ${defaultFontsize} !important;
      }
      /**********/
      /* COLORS */
      /**********/
      #navbar, .post-listings, #postContent, div > ul.comments > .comment {
        background-color: ${secondaryBackground} !important;
      }
      .card {
        --bs-card-bg: ${secondaryBackground} !important;
        --bs-card-cap-bg: ${cardCapBackground} !important;
        --bs-card-color: ${cardText} !important;
        color: ${cardText} !important;
      }
      textarea.form-control, input.form-control[type="text"] {
        background-color: ${formBackground} !important;
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
        max-width: ${mdMaxwidth} !important;
      }
      /****************************/
      /* FONT SIZES & TEXT COLORS */
      /****************************/
      .post-title .h5 {
        font-size: ${titleFontsize} !important;
      }
      a > span.fst-italic {
        color: var(--bs-orange) !important;
      }
      .comment .md-div, .card .md-div {
        font-size: ${mdFontsize} !important;
        line-height: ${mdLineheight} !important;
      }
      .post-listings .post-title ~ .small {
        font-size: ${subtitleFontsize} !important;
      }
      /****************************/
      /* POST LISTINGS & COMMENTS */
      /****************************/
      .post-listings {
        box-shadow: ${cardShadow} !important;
        padding: ${defaultSpacing} !important;
      }
      div > ul.comments > .comment {
        box-shadow: ${cardShadow} !important;
        padding: 0 ${defaultSpacing} !important;
        margin-bottom: 8px !important;
      }
      div > ul.comments > .comment > .comments .comment {
        margin-left: ${defaultSpacing} !important;
      }
      div > ul.comments > li.comment > article.border-top, div > ul.comments.border-top {
        border-top: none !important;
      }
      .post-listings hr {
        margin-top: ${defaultSpacing} !important;
        margin-bottom: ${defaultSpacing} !important;
      }
      .post-listing + hr.my-3 {
        margin-right: -${defaultSpacing} !important;
        margin-left: -${defaultSpacing} !important;
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
        background-color: ${thumbBackground} !important;
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
        background-color: ${thumbBackgroundHover} !important;
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
        border-radius: 0 !important;
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
      /***********/
      /* BUTTONS */
      /***********/
      .btn {
        --bs-btn-border-radius: ${buttonRadius} !important;
      }
      .btn.btn-outline-secondary:not(.active) {
        border: 1px solid ${buttonBorder} !important;
        background-color: ${buttonBackground} !important;
        box-shadow: rgba(0,0,0,0.05) 0px 1px 0px 0px !important;
        color: ${primaryText} !important;
      }
      .btn.btn-outline-secondary:not(.active):hover {
        background-color: color-mix(in srgb, currentColor 5%, #fff) !important;
      }
      .btn.btn-outline-secondary.active {
        box-shadow: rgba(0,0,0,0.05) 0px 1px 0px 0px,rgba(0,0,0,0.2) 0px -1px 0px 0px inset !important;
      }
    `
    const styleTag = document.createElement('style');
    styleTag.appendChild(document.createTextNode(css));
    document.head.appendChild(styleTag);
  }

})();

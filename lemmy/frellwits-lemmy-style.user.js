// ==UserScript==
// @name        Frellwit's Lemmy Style
// @namespace   https://github.com/lassekongo83/UserScripts/lemmy
// @description A userstyle for Lemmy inspired by the old reddit design
// @version     0.5
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
    const element = document.getElementById("app");
    const themeVariant = element.getAttribute("data-bs-theme");

    const isCompact = document.head.querySelector('link[href*="-compact.css"]') !== null;

    // light : dark
    const primaryBackground    = themeVariant === "light" ? "#f0f0f0" : "#121317";
    const secondaryBackground  = themeVariant === "light" ? "#ffffff" : "#1c1d21";
    const primaryText          = themeVariant === "light" ? "#222222" : "#ffffff";
    const primaryTextRGB       = themeVariant === "light" ? "13, 13, 13" : "255, 255, 255";
    const cardCapBackground    = themeVariant === "light" ? "#fcfcfc" : "#26272b";
    const cardText             = themeVariant === "light" ? "#222222" : "#ffffff";
    const cardShadow           = themeVariant === "light" ? "0 1px 2px rgba(0,0,0,.1)" : "inset 0 0 0 1px rgba(255,255,255,0.14)";
    const thumbBackground      = themeVariant === "light" ? "#d2dbe0" : "rgba(255,255,255,0.18)";
    const thumbBackgroundHover = themeVariant === "light" ? "#c6d2d8" : "rgba(255,255,255,0.22)";
    const formBackground       = themeVariant === "light" ? "#ffffff" : "#26272b";
    const buttonBackground     = themeVariant === "light" ? "#ffffff" : "#303135";
    const buttonHover          = themeVariant === "light" ? "#f5f5f5" : "#43444a";
    const buttonBorder         = themeVariant === "light" ? "#c6d2d8" : "rgba(255,255,255,0.22)";

    // Brand colors
    // This is to make links to proprietary social media stand out.
    // You don't want to click on such a link unnecessarily, do you? ;-)
    const brandYouTube     = "#FF0000";
    const brandFacebook    = "#4267B2";
    const brandTwitter     = "#1DA1F2";
    const brandTwitch      = "#6441a5";
    const brandReddit      = "#ff4500";
    const brandImgur       = "#89c623";
    const brandInstagram   = "radial-gradient(circle farthest-corner at 28% 100%, #fcdf8f 0%, #fbd377 10%, #fa8e37; 22%, #f73344; 35%, transparent 65%), linear-gradient(145deg, #3051f1 10%, #c92bb7 70%)";

    // Misc values
    // Is compact - true : false
    const defaultSpacing   = isCompact ? ".45rem" : ".85rem"; // Spacing between most elements
    const defaultFontsize  = isCompact ? "1rem" : "1rem";     // Default body font size
    const mdFontsize       = isCompact ? "0.875rem" : "14px";   // md-div aka comments and posts
    const mdLineheight     = isCompact ? "1.5" : "1.5";
    const mdMaxwidth       = isCompact ? "60em" : "60em";
    const codeFontsize     = isCompact ? ".9rem" : ".9rem";
    const titleFontsize    = isCompact ? "small" : "medium";
    const titleFontweight  = isCompact ? "600" : "500";
    const subtitleFontsize = isCompact ? "x-small" : "x-small";
    const thumbWidth       = isCompact ? "50px" : "70px";
    const thumbHeight      = isCompact ? "50px" : "70px";
    const textThumbWidth   = isCompact ? "40px" : "50px";
    const textThumbHeight  = isCompact ? "40px" : "50px";

    // Other stuff
    const buttonRadius     = "4px";
    const defaultFonts     = "verdana,arial,helvetica,sans-serif"


    const css = `
      /***********/
      /* GLOBALS */
      /***********/
      :root {
        --bs-body-bg: ${primaryBackground} !important;
        --bs-body-color: ${primaryText} !important;
        --bs-body-color-rgb: ${primaryTextRGB} !important;
        --bs-font-sans-serif: ${defaultFonts} !important;
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
        font-weight: ${titleFontweight} !important;
      }
      a > span.fst-italic {
        color: var(--bs-orange) !important;
      }
      .comment .md-div, .card .md-div {
        font-size: ${mdFontsize} !important;
        line-height: ${mdLineheight} !important;
      }
      .post-listings .post-title ~ .small, span.badge {
        font-size: ${subtitleFontsize} !important;
      }
      code {
        font-size: ${codeFontsize} !important;
      }
      .btn:not(.btn-link), .btn-secondary, .form-select, textarea.form-control {
        font-size: ${mdFontsize} !important;
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
      article.row.post-container > .col {
        display: flex !important;
        align-items: center !important;
      }
      /* Thumbnails */
      button.thumbnail.rounded,
      button.thumbnail.rounded img.rounded {
        border-radius: 0 !important;
      }
      .post-listing button.thumbnail.p-0,
      .post-listing .px-0,
      a.thumbnail[rel="noopener nofollow"] {
        max-width: ${thumbWidth} !important;
        max-height: ${thumbHeight} !important;
        min-width: ${thumbWidth} !important;
        min-height: ${thumbHeight} !important;
      }
      .post-listing .px-0 {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin: auto !important;
      }
      a[href^="/post/"] .thumbnail,
      a.text-body[rel="noopener nofollow"] .thumbnail {
        background-color: ${thumbBackground} !important;
        color: white !important;
        border-radius: 100% !important;
        border: none !important;
        min-width: ${textThumbWidth} !important;
        min-height: ${textThumbHeight} !important;
        max-width: ${textThumbWidth} !important;
        max-height: ${textThumbHeight} !important;
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
      .search.container-lg {
        margin-left: ${defaultSpacing} !important;
        margin-right: ${defaultSpacing} !important;
      }
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
        color: ${brandYouTube} !important;
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
      a[rel="noopener nofollow"][href*="twitch.tv"] .thumbnail,
      a[rel="noopener nofollow"][href*="twitch.tv"] .thumbnail:hover {
        background-color: ${brandTwitch} !important;
        color: white !important;
      }
      a[rel="noopener nofollow"][href*="instagram.com"] .thumbnail,
      a[rel="noopener nofollow"][href*="instagram.com"] .thumbnail:hover {
        background: ${brandInstagram} !important;
        color: white !important;
      }
      a[rel="noopener nofollow"][href*="imgur.com"] .thumbnail,
      a[rel="noopener nofollow"][href*="imgur.com"] .thumbnail:hover {
        background-color: ${brandImgur} !important;
        color: white !important;
      }
      a[rel="noopener nofollow"][href*="redd.it"] .thumbnail,
      a[rel="noopener nofollow"][href*="reddit.com"] .thumbnail,
      a[rel="noopener nofollow"][href*="redd.it"] .thumbnail:hover,
      a[rel="noopener nofollow"][href*="reddit.com"] .thumbnail:hover {
        background-color: ${brandReddit} !important;
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
        background-color: ${buttonHover} !important;
      }
      .btn.btn-outline-secondary.active {
        box-shadow: rgba(0,0,0,0.05) 0px 1px 0px 0px,rgba(0,0,0,0.2) 0px -1px 0px 0px inset !important;
      }
    `

    function minifyCSS(css) {
      // Remove comments
      css = css.replace(/\/\*[\s\S]*?\*\//g, '');
      // Remove whitespace and newlines
      css = css.replace(/\s+/g, ' ');
      // Remove unnecessary semicolons
      css = css.replace(/;}/g, '}');
      // Remove whitespace around selectors, properties, and values
      css = css.replace(/\s*({|}|:|;)\s*/g, '\$1');
      return css;
    }

    const minifiedCSS = minifyCSS(css);
    const styleTag = document.createElement('style');
    styleTag.appendChild(document.createTextNode(minifiedCSS));
    document.head.appendChild(styleTag);
  }

})();

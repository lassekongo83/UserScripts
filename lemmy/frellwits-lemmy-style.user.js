// ==UserScript==
// @name        Frellwit's Lemmy Style
// @namespace   https://github.com/lassekongo83/UserScripts/lemmy
// @description A userstyle for Lemmy inspired by the old reddit design
// @version     0.6
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
    const themeVariant = document.getElementById("app").getAttribute("data-bs-theme");
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isCompact = document.head.querySelector('link[href*="-compact.css"]') !== null;

    // light : dark
    // themeVariant can somehow still be light even when the user prefer dark themes
    const primaryBackground    = (!prefersDarkTheme && themeVariant === "light") ? "#f0f0f0" : "#121317";
    const secondaryBackground  = (!prefersDarkTheme && themeVariant === "light") ? "#ffffff" : "#1c1d21";
    const primaryText          = (!prefersDarkTheme && themeVariant === "light") ? "#222222" : "#ffffff";
    const primaryTextRGB       = (!prefersDarkTheme && themeVariant === "light") ? "13, 13, 13" : "255, 255, 255";
    const cardCapBackground    = (!prefersDarkTheme && themeVariant === "light") ? "#fcfcfc" : "#26272b";
    const cardText             = (!prefersDarkTheme && themeVariant === "light") ? "#222222" : "#ffffff";
    const cardShadow           = (!prefersDarkTheme && themeVariant === "light") ? "0 1px 2px rgba(0,0,0,.1)" : "inset 0 0 0 1px rgba(255,255,255,0.1)";
    const thumbBackground      = (!prefersDarkTheme && themeVariant === "light") ? "#d2dbe0" : "rgba(255,255,255,0.18)";
    const thumbBackgroundHover = (!prefersDarkTheme && themeVariant === "light") ? "#c6d2d8" : "rgba(255,255,255,0.22)";
    const formBackground       = (!prefersDarkTheme && themeVariant === "light") ? "#ffffff" : "#26272b";
    const buttonBackground     = (!prefersDarkTheme && themeVariant === "light") ? "#ffffff" : "#303135";
    const buttonHover          = (!prefersDarkTheme && themeVariant === "light") ? "#f5f5f5" : "#43444a";
    const buttonBorder         = (!prefersDarkTheme && themeVariant === "light") ? "#c6d2d8" : "rgba(255,255,255,0.22)";
    const codeBackground       = (!prefersDarkTheme && themeVariant === "light") ? "#fcfcfc" : "#303135";
    const codeBorder           = (!prefersDarkTheme && themeVariant === "light") ? "#e6e6e6" : "rgba(255,255,255,0.1)";
    const quoteBackground      = (!prefersDarkTheme && themeVariant === "light") ? "#fcfcfc" : "#303135";
    const quoteBorder          = (!prefersDarkTheme && themeVariant === "light") ? "#e6e6e6" : "rgba(255,255,255,0.1)";

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
    // Is compact - false : true
    const documentWidth    = !isCompact ? "100%" : "100%";        // Fill out the entire document
    const mainContainer    = !isCompact ? "80%" : "80%";          // Main content
    const sideContainer    = !isCompact ? "20%" : "20%";          // Sidebar
    const defaultSpacing   = !isCompact ? ".85rem" : ".45rem";    // Spacing between most elements
    const defaultFontsize  = !isCompact ? "1rem" : "1rem";        // Default body font size
    const mdFontsize       = !isCompact ? "14px" : "0.875rem";    // md-div aka comments and posts
    const mdLineheight     = !isCompact ? "1.5" : "1.5";
    const mdMaxwidth       = !isCompact ? "60em" : "60em";        // Comment max width
    const codeFontsize     = !isCompact ? "14px" : "0.875rem";
    const titleFontsize    = !isCompact ? "16px" : "small";
    const titleFontweight  = !isCompact ? "500" : "500";
    const subtitleFontsize = !isCompact ? "x-small" : "x-small";
    const thumbWidth       = !isCompact ? "70px" : "50px";        // Image thumbnails
    const thumbHeight      = !isCompact ? "70px" : "50px";
    const textThumbWidth   = !isCompact ? "50px" : "40px";        // Round text link thumbnails
    const textThumbHeight  = !isCompact ? "50px" : "40px";
    const commentSpacing   = !isCompact ? "8px" : "5px";          // Bottom margin between comments

    // Other stuff
    const defaultFonts     = "verdana,arial,helvetica,sans-serif"
    const cardRadius       = "6px";                               // Border radius of every card, comment and colored content container
    const quoteRadius      = "4px";                               // Blockquote radius
    const buttonRadius     = "4px";

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
        max-width: ${documentWidth} !important;
      }
      .col-md-8 { /* Main content */
        flex: 0 0 ${mainContainer} !important;
        width: ${mainContainer} !important;
      }
      .col-md-4 { /* Sidebar */
        flex: 0 0 ${sideContainer} !important;
        width: ${sideContainer} !important;
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
      .btn:not(.btn-link), .btn-secondary, .form-select, textarea.form-control, .col-md-4 .list-inline-item:not(.badge) {
        font-size: ${mdFontsize} !important;
      }
      /****************************/
      /* POST LISTINGS & COMMENTS */
      /****************************/
      .post-listings, div > .comments > .comment {
        border-radius: ${cardRadius} !important;
      }
      .post-listings {
        box-shadow: ${cardShadow} !important;
        padding: ${defaultSpacing} !important;
      }
      .post-listing > article {
        padding: ${defaultSpacing} !important;
      }
      div > ul.comments > .comment {
        box-shadow: ${cardShadow} !important;
        padding: 0 ${defaultSpacing} !important;
        margin-bottom: ${commentSpacing} !important;
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
        background-color: ${quoteBackground} !important;
        border: 1px solid ${quoteBorder} !important;
        border-radius: ${quoteRadius} !important;
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
        vertical-align: -0.4em !important;
      }
      .md-div blockquote p {
        display: inline !important;
      }
      .md-div blockquote {
        background-color: ${quoteBackground} !important;
        border: 1px solid ${quoteBorder} !important;
        border-radius: ${quoteRadius} !important;
        padding: 8px !important;
      }
      .md-div pre {
        background-color: ${codeBackground} !important;
        border: 1px solid ${codeBorder} !important;
        padding: 4px 9px !important;
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
      .card-header:first-child {
        border-radius: ${cardRadius} ${cardRadius} 0 0 !important;
      }
      .card {
        box-shadow: ${cardShadow} !important;
        border: none !important;
        border-radius: ${cardRadius} !important;
      }
      .card.border-secondary:not(.post-metadata-card) {
        border: none !important;
      }
      form.markdown-textarea textarea.form-control {
        transition: min-height .3s;
      }
      form.markdown-textarea textarea.form-control:focus {
        min-height: 400px;
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

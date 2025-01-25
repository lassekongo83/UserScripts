// ==UserScript==
// @name         Exclude X/twitter from searches
// @namespace    Violentmonkey Scripts
// @version      0.1
// @description  Automatically exclude x.com and twitter.com from search results on various search engines
// @author       you
// @match        https://www.google.*/search*
// @match        https://duckduckgo.com/*
// @match        https://www.bing.com/search*
// @match        https://www.ecosia.org/search*
// @grant        none
// ==/UserScript==

(function() {
  const excludedSites = [
    'x.com',
    'twitter.com'
  ];
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  if (params.has('q')) {
    let query = params.get('q');
    let needsUpdate = false;

    excludedSites.forEach(site => {
      const exclusionTerm = ` -site:${site}`;
      if (!query.includes(exclusionTerm)) {
        query += exclusionTerm;
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      params.set('q', query);
      url.search = params.toString();
      window.location.href = url.toString();
    }
  }
})();

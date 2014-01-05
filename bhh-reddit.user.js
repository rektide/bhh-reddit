// ==UserScript==
// @name Blackheart-Reddit
// @description Notify yourself of your Reddit activity
// @match http://*.reddit.com/*
// @match https://*.reddit.com/*
// @match http://reddit.com/*
// @match https://reddit.com/*
// @downloadURL https://raw.github.com/rektide/blackheart-reddit/master/blackheart-reddit.user.js
// ==/UserScript==
(function(){

var _= require("lodash")

var listing= {index: '.linklisting .thing',
  id: ['.buttons a.comments', 'href'],
  title: 'a.title',
  url: ['a.title', 'href'],
  author: '.tagline .author',
  r: ''.tagline .subreddit,
  submitted: ['.tagline time', 'datetime'],
  up: '.midcol .up',
  down: '.midcol .down'
  share: '.buttons .share-button',
  save: '.buttons .save-button'}

var comment= _.extend(listing, {index: '.comment',
  url: ['.buttons .bylink', 'href'],
  comment: '.usertext-body div',
  parent: ['', 'parentNode', 'parentNode', 'parentNode']
})

var extra= {source: {
    objectType: "application",
    displayName: "BlackHoleHeart-Reddit",
    url: "https://github.com/rektide/bhh-reddit"
  }} 
 

})()

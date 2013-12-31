# Blackheart-Reddit #

Blackheart-Reddit is part of a BlackHeart Data-Capture PESOS[1] Toolsuite designed to capture your own upvote-downvte activity on Reddit. It has two major components:

* bh-reddit-server defines a Node.js Connect[2] middleware endpoint that can record Vote events
* bh-reddit-client is a userscript[3] for the browser that will issue a html ping to your designated server for your votes

[1] http://indiewebcamp.com/PESOS Publish Everywhere Subscribe (to your) Own Site
[2] http://www.senchalabs.org/connect/ Connect web-serving middleware
[3] http://userscripts.org/about/installing Installing Userscripts to enhance the browser

GENERATOR-CLOSURE-STACK
=======================

Client-heavy stack for node development.

The stack:

 - [Node](http://nodejs.org/): Server side JavaScript
 - [Grunt](http://gruntjs.com/): Task automation
 - [Express](http://expressjs.com/): Web server for node 
 - [LESS CSS](http://lesscss.org/): Programmatic CSS
 - [Closure Compiler](https://developers.google.com/closure/compiler/): Type safe and minified JavaScript
 - [Closure Templates](https://developers.google.com/closure/templates/):  Generate JavaScript for creating html

Quick install
-------------
Download + run [bootstrap.sh](https://raw.githubusercontent.com/andrewpmckenzie/generator-closure-stack/master/app/templates/bootstrap.sh)
(this will install a local version of node, grunt and yeoman).

Alternative install
-------------------
1. Install [node + npm](http://nodejs.org/)
2. `npm install -g grunt yo generator-closure-stack`
3. `yo closure-stack`
4. `grunt setup`

To run
------
`grunt run:dev`

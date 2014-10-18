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

Limitations / todos
-------------------
- does not make use of closure builder to assemble client JS
- closure library is only used for namespacing

Folder structure
----------------
`src` code for your application

`src/client` code run in the browser

`src/client/js` javascript (and externs) run in the browser

`src/client/js/externs` extern files for the closure compiler

`src/client/js/third_party` third party code that is included directly on the page, bypassing closure compiler (except for
  an extern)

`src/client/js/JS_NAMESPACE` js code for your application 

`src/client/js/listing.json` an ordered listing of code for your application

`src/client/less` LESS stylesheets for your application

`src/client/soy` soy templates for your application

`src/server` code run on the server

`src/server/js` javascript run on the server

`src/server/soy` soy templates used on the server.

`src/tasks` grunt tasks

`config` app configuration (like server port, common paths etc) used by grunt tasks. New files are automatically imported
 as grunt configs and can cross-reference each other.

`build` output of compilation tasks like conversion of less to css, soy templates to javascript, and closure JS compilation.

`dependencies` needed binaries like node and the closure/soy compiler jars.

`node_modules` node dependencies.

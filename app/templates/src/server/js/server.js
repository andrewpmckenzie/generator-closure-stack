var Express = require('express');

// http://expressjs.com/

var Server = function() {
  this.app = Express();
  this.soynode = require('soynode');
  this.isReady_ = false;

  // Prepare template
  this.soynode.setOptions({
    outputDir: process.env.SERVER_SOY_ROOT,
    allowDynamicRecompile: true
  });

  this.soynode.compileTemplates(__dirname + '/../soy', function (err) {
    if (err) {
      throw err;
    }
    this.isReady_ = true;
  }.bind(this));

  // Prepare routes
  this.setupRoutes_();
};

Server.prototype = {
  setupRoutes_: function() {

    // Static paths (CSS, JS, IMG)
    this.app.use(Express.static(process.env.STATIC_ROOT));

    // If no other routes match, fallback to client routing
    this.app.use(function(req, res, next) {
      if (this.isReady_) {
        var minJs = req.param('js') !== 'uncompressed';
        var html = this.soynode.render('$_jsNamespace_$.templates.app.chrome', {
          minJs: minJs
        });
        res.send(html);
      } else {
        res.send('Warming up...');
      }
    }.bind(this));

  },

  start: function(port) {
    this.app.listen(port);
    console.log('Server running on port ' + process.env.PORT);
  }
};

new Server().start(process.env.PORT);

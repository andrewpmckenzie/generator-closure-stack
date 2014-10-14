var Express = require('express');

var Server = function() {
  this.app = Express();
  this.setupRoutes_();
  this.soynode = require('soynode');
  this.isReady_ = false;

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

};

Server.prototype = {
  setupRoutes_: function() {
    this.app.get('/', function(req, res){
      if (this.isReady_) {
        var html = this.soynode.render('$_jsNamespace_$.templates.app.chrome', {});
        res.send(html);
      } else {
        res.send('Warming up...');
      }
    }.bind(this));

    this.app.use(Express.static(process.env.STATIC_ROOT))
  },

  start: function(port) {
    this.app.listen(port);
    console.log('Server running on port ' + process.env.PORT);
  }
};

new Server().start(process.env.PORT);

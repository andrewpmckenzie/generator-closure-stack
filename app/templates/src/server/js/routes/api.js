module.exports = function() {

  var express = require('express'),
      app = express();

  app.get('/user/:id', function(req, res) {
    var userId = req.params.id;

    res.json({
      userName: 'user_' + userId
    }).end();
  });

  app.use(function(req, res) { res.status(404).end(); });

  return app;

}();

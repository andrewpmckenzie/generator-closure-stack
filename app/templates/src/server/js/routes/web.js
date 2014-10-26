module.exports = function() {

  var soynode = require('soynode'),
      templateIsCompiled = false;

  soynode.setOptions({
    outputDir: process.env.SERVER_SOY_ROOT,
    allowDynamicRecompile: true
  });

  soynode.compileTemplates(__dirname + '/../../soy', function (err) {
    if (err) {
      throw err;
    }
    templateIsCompiled = true;
  }.bind(this));

  return function (req, res, next) {
    if (templateIsCompiled) {
      var minJs = req.param('js') !== 'uncompressed';
      var html = soynode.render('tfp.templates.app.chrome', {
        minJs: minJs
      });
      res.send(html);
    } else {
      res.send('Warming up...');
    }
  };

}();

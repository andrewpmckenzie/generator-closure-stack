var Express = require('express'),
    app = Express();

// Static paths (CSS, JS, IMG)
app.use(Express.static(process.env.STATIC_ROOT));

// Api paths
app.use('/api', require('./routes/api'));

// Web paths (all other routes)
app.use(require('./routes/web'));

app.listen(process.env.PORT);
console.log('Server running on port ' + process.env.PORT);

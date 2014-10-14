'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var StackGenerator = yeoman.generators.Base.extend({
  constructor: function(args, options) {
    yeoman.generators.Base.call(this, options.argv.original, options);

    this.prompts_ = [{
      name: 'projectName',
      message: 'Project name',
      default: this._.camelize(this.appname)
    }, {
      name: 'projectDescription',
      message: 'Description',
      default: this._.humanize('The ' + this.appname + ' project.')
    }, {
      name: 'projectHomepage',
      message: 'Homepage'
    }, {
      name: 'projectUrl',
      message: 'Repository'
    }, {
      name: 'authorName',
      message: 'Your name',
      default: this.user.git.name()
    }, {
      name: 'authorEmail',
      message: 'Your email',
      default: this.user.git.email()
    }, {
      name: 'authorUrl',
      message: 'Your website'
    }, {
      name: 'jsNamespace',
      message: 'What JS namespace would you like?',
      default: this._.camelize(this.appname)
    }];

    this.prompts_.forEach(function(prompt) {
      // Prompts can be passed as flags, or will be prompted for
      this.option(prompt.name, {
        desc: prompt.message,
        type: String
      });
    }.bind(this));

    this.pkg = require('../package.json');

    // HACK: override hardcoded detector so we can use custom delimiters
    this._engine.options.detecter = /\$_.+_\$/;
  },

  prompting: function () {
    var done = this.async();

    this.user.github.username(function(e, username) {

      // Have Yeoman greet the user.
      this.log(yosay('Let\'s set up the stack!'));

      var githubUrl = username ? ('https://github.com/' + username) : '';
      var projectUrl = username ? (githubUrl + '/' + this._.dasherize(this.appname)) : '';

      // Only prompt for values not provided as flags
      var prompts = this.prompts_.filter(function(prompt) {
        // Hack: add jit defaults
        switch (prompt['name']) {
          case 'projectUrl':
          case 'projectHomepage':
            prompt.default = projectUrl;
            break;
          case 'authorUrl':
            prompt.default = githubUrl;
            break;
        }

        return !this.options[prompt.name];
      }.bind(this));

      this.prompt(prompts, function (props) {
        this.props = this._.extend({}, this.options, props);
        done();
      }.bind(this));

    }.bind(this));
  },

  writing: {
    // Write all app files by traversing the templates directory
    app: function () {
      var createdDirs = {};

      this.src.recurse('.', function(abspath, rootdir, subdir, filename) {
        var path = (subdir ? subdir + '/' : '') + filename;

        // Replace all directories named APP with the app name, and remove any preceeding underscores from filenames
        var destPath = (subdir ? subdir + '/' : '').replace('APP', this.props.jsNamespace) + filename.replace(/^_/, '');

        // Only copy third_party files
        if (path.indexOf('third_party') > 0) {
          this.copy(path, destPath);
        } else {
          this.template(path, destPath, this.props, {
            evaluate: /\$__(.+?)__\$/g,
            escape: /\$___(.+?)___\$/g,
            interpolate: /\$_(.+?)_\$/g
          });
        }
      }.bind(this));
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = StackGenerator;

// http://gruntjs.com/getting-started
module.exports = function(grunt) {

  // LOAD CONFIG FILES
  // -----------------
  // JSON files in the ./config dir will be loaded as config properties,
  // e.g. ./config/my/TEST_CONFIG.JSON will be available as <%= my.TEST_CONFIG %>
  grunt.config.set('PROJECT_ROOT', __dirname);
  var JsonExtensionRegex = /\.json$/;
  grunt.file.recurse('./config', function(abspath, rootdir, subdir, filename) {
    if (JsonExtensionRegex.test(filename)) {
      var propName = filename.replace(JsonExtensionRegex, '');
      var packageName = subdir ? subdir.replace(/\W/, '.') + '.' : '';
      grunt.config.set(packageName + propName, grunt.file.readJSON(abspath));
    }
  });


  // SET ENV VARIABLES
  // -----------------
  // Used by express server
  process.env.SERVER_SOY_ROOT = grunt.config.get('BASE.BUILT_SERVER_SOY_ROOT');
  process.env.STATIC_ROOT = grunt.config.get('BASE.BUILT_STATIC_ROOT');

  // LOAD TASKS
  // ----------
  grunt.loadTasks('src/tasks');

};

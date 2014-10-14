module.exports = function(grunt) {
  grunt.registerTask('run:dev', ['compilesoy:dev', 'compilejs:dev', 'compileless:dev', 'runserver:dev', 'watch'])
};

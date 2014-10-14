module.exports = function(grunt) {

  grunt.config.merge({

    // https://github.com/ericclemmons/grunt-express-server
    express: {
      options: {
        script: grunt.file.readJSON('package.json').main
      },

      dev: {
        options: {
          node_env: 'development',
          port: '<%= SERVER.DEV_PORT %>'
        }
      }
    },

    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      options: {
        nospawn: true
      },

      express: {
        files: [ '<%= BASE.SERVER_ROOT %>/**/*.*' ],
        tasks: [ 'express:dev' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.task.registerTask('runserver:dev', ['express:dev']);
};

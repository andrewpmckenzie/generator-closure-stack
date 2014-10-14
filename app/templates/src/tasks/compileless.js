module.exports = function(grunt) {

  grunt.config.merge({

    // https://github.com/gruntjs/grunt-contrib-less
    less: {
      options: {
        compress: true,
        yuicompress: true
      },

      dev: {
        files: [{
          expand: true,
          cwd: '<%= BASE.CLIENT_LESS_ROOT %>',
          src: ['<%= BASE.CLIENT_LESS_GLOB %>'],
          dest: '<%= BASE.BUILT_CLIENT_LESS_ROOT %>',
          ext: '.css'
        }]
      }
    },

    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      options: {
        nospawn: true
      },

      styles: {
        files: [ '<%= BASE.CLIENT_LESS_FILES %>' ],
        tasks: [ 'less:dev' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.task.registerTask('compileless:dev', ['less:dev']);
};

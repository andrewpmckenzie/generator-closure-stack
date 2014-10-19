module.exports = function(grunt) {

  grunt.config.merge({

    // https://www.npmjs.org/package/grunt-soy-compile
    soycompile: {
      options: {
        jarPath: '<%= DEPENDENCIES.SOY_JAR_DIR %>',
        compileflags: {
          shouldDeclareTopLevelNamespaces: false,
          shouldGenerateJsdoc: true
        }
      },

      dev: {
        expand: true,
        cwd: '<%= BASE.CLIENT_SOY_ROOT %>',
        src: ['<%= BASE.CLIENT_SOY_GLOB %>'],
        dest: '<%= BASE.BUILT_CLIENT_SOY_ROOT %>'
      }
    },

    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      options: {
        nospawn: true
      },

      soycompile: {
        files: [ '<%= BASE.CLIENT_SOY_FILES %>' ],
        tasks: [ 'soycompile:dev', 'closureCompiler' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-soy-compile');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.task.registerTask('compilesoy:dev', ['soycompile:dev']);
};

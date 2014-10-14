module.exports = function(grunt) {
  var jsListing = grunt.file.readJSON(grunt.config.get('BASE.CLIENT_JS_LISTING_FILE'));

  grunt.config.merge({

    // https://www.npmjs.org/package/grunt-closure-tools
    closureCompiler: {
      options: {
        compilerFile: '<%= DEPENDENCIES.CLOSURE_COMPILER_JAR %>',
        compilerOpts: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          // https://github.com/google/closure-compiler/wiki/Externs-For-Common-Libraries
          externs: ['<%= BASE.CLIENT_JS_EXTERNS %>'],
          warning_level: 'verbose',
          summary_detail_level: 3,
          output_wrapper: '"(function(){ %output% }).call(this);"'
        },
        execOpts: {
          maxBuffer: 100000 * 1024
        },
        TieredCompilation: true,
        javaFlags: ['-Xms512m']
      },

      dev: {
        src: [jsListing],
        dest: ['<%= BASE.BUILT_CLIENT_JS_FILE %>']
      }
    },

    copy: {
      thirdpartyjs: {
        files: [{
          expand: true,
          cwd: '<%= BASE.CLIENT_JS_THIRD_PARTY_ROOT %>',
          src: ['<%= BASE.CLIENT_JS_THIRD_PARTY_GLOB %>'],
          dest: '<%= BASE.BUILT_CLIENT_JS_THIRD_PARTY_ROOT %>',
          filter: 'isFile'
        }]
      }
    },

    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      options: {
        nospawn: true
      },

      closurecompile: {
        files: [ '<%= BASE.CLIENT_JS_FILES %>', '!<%= BASE.CLIENT_JS_THIRD_PARTY_FILES %>' ],
        tasks: [ 'closureCompiler:dev' ]
      },

      thirdpartyjs: {
        files: [ '<%= BASE.CLIENT_JS_THIRD_PARTY_FILES %>' ],
        tasks: [ 'copy:thirdpartyjs' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-closure-tools');

  grunt.task.registerTask('compilejs:dev', ['closureCompiler:dev', 'copy:thirdpartyjs']);
};

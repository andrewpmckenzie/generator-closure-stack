module.exports = function(grunt) {
  var jsListing = grunt.file.readJSON(grunt.config.get('BASE.CLIENT_JS_LISTING_FILE'));
  var _ = require('lodash');

  var compilerOpts = {
    // https://github.com/google/closure-compiler/wiki/Externs-For-Common-Libraries
    externs: ['<%= BASE.CLIENT_JS_EXTERNS %>'],
    warning_level: 'verbose',
    summary_detail_level: 3,
    output_wrapper: '"(function(){ %output% }).call(this);"',
    process_closure_primitives: true
  };

  grunt.config.merge({

    // https://www.npmjs.org/package/grunt-closure-tools
    closureCompiler: {
      options: {
        compilerFile: '<%= DEPENDENCIES.CLOSURE_COMPILER_JAR %>',
        compilerOpts: compilerOpts,
        execOpts: {
          maxBuffer: 100000 * 1024
        },
        TieredCompilation: true,
        javaFlags: ['-Xms512m']
      },

      advancedCompile: {
        options: {
          compilerOpts: _.extend({
            compilation_level: 'ADVANCED_OPTIMIZATIONS'
          }, compilerOpts)
        },
        src: [jsListing],
        dest: ['<%= BASE.BUILT_CLIENT_ADVANCED_JS_FILE %>']
      },

      standardCompile: {
        src: [jsListing],
        dest: ['<%= BASE.BUILT_CLIENT_JS_FILE %>']
      }
    },

    // https://github.com/sapegin/grunt-bower-concat
    bower_concat: {
      all: {
        dependencies: {
          'bootstrap': 'reset-css'
        },
        dest: '<%= BASE.BUILT_CLIENT_JS_THIRD_PARTY %>',
        cssDest: '<%= BASE.BUILT_CLIENT_CSS_THIRD_PARTY %>'
      }
    },

    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      bower: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          '<%= BASE.BUILT_CLIENT_JS_THIRD_PARTY_MIN %>': '<%= BASE.BUILT_CLIENT_JS_THIRD_PARTY %>'
        }
      }
    },

    // https://github.com/gruntjs/grunt-contrib-cssmin
    cssmin: {
      bower: {
        files: {
          '<%= BASE.BUILT_CLIENT_CSS_THIRD_PARTY_MIN %>': '<%= BASE.BUILT_CLIENT_CSS_THIRD_PARTY %>'
        }
      }
    },

    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      options: {
        nospawn: true
      },

      closurecompile: {
        files: [ '<%= BASE.CLIENT_JS_FILES %>' ],
        tasks: [ 'closureCompiler' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.task.registerTask('third-party-compile', ['bower_concat:all', 'uglify:bower', 'cssmin:bower']);
  grunt.task.registerTask('compilejs:dev', ['closureCompiler', 'third-party-compile']);
};

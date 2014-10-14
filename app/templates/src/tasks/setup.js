module.exports = function(grunt) {

  grunt.config.merge({
    curl: {
      'soy-compiler-jar': {
        src: grunt.config.get('DEPENDENCIES.SOY_TO_JS_COMPILER_URL'),
        dest: grunt.config.get('DEPENDENCIES.SOY_TO_JS_COMPILER_TEMP_ZIP')
      },
      'soy-msg-extractor-jar': {
        src: grunt.config.get('DEPENDENCIES.SOY_MSG_EXTRACTOR_URL'),
        dest: grunt.config.get('DEPENDENCIES.SOY_MSG_EXTRACTOR_TEMP_ZIP')
      },
      'closure-compiler-jar': {
        src: grunt.config.get('DEPENDENCIES.CLOSURE_COMPILER_URL'),
        dest: grunt.config.get('DEPENDENCIES.CLOSURE_COMPILER_TEMP_ZIP')
      }
    },

    unzip: {
      'soy-compiler-jar': {
        src: grunt.config.get('DEPENDENCIES.SOY_TO_JS_COMPILER_TEMP_ZIP'),
        dest: grunt.config.get('DEPENDENCIES.SOY_JAR_DIR')
      },
      'soy-msg-extractor-jar': {
        src: grunt.config.get('DEPENDENCIES.SOY_MSG_EXTRACTOR_TEMP_ZIP'),
        dest: grunt.config.get('DEPENDENCIES.SOY_JAR_DIR')
      },
      'closure-compiler-jar': {
        src: grunt.config.get('DEPENDENCIES.CLOSURE_COMPILER_TEMP_ZIP'),
        dest: grunt.config.get('DEPENDENCIES.CLOSURE_COMPILER_JAR_DIR')
      }
    }
  });

  grunt.registerTask('maybe-install-soy-jar', function() {
    if (!grunt.file.isDir(grunt.config.get('DEPENDENCIES.SOY_JAR_DIR'))) {
      grunt.log.writeln('Could not find soy jars - installing from web.');

      grunt.task.run([
        'curl:soy-compiler-jar',
        'curl:soy-msg-extractor-jar',
        'unzip:soy-compiler-jar',
        'unzip:soy-msg-extractor-jar'
      ]);

      grunt.log.writeln('Soy jars installed successfully.');
    } else {
      grunt.log.writeln('Soy jars are already installed.');
    }
  });

  grunt.registerTask('maybe-install-closure-jar', function() {
    if (!grunt.file.isFile(grunt.config.get('DEPENDENCIES.CLOSURE_COMPILER_JAR'))) {
      grunt.log.writeln('Could not find closure jar - installing from web.');

      grunt.task.run([
        'curl:closure-compiler-jar',
        'unzip:closure-compiler-jar'
      ]);

      grunt.log.writeln('Closure jars installed successfully.');
    } else {
      grunt.log.writeln('Closure jars are already installed.');
    }
  });

  grunt.registerTask('setup', ['maybe-install-soy-jar', 'maybe-install-closure-jar']);

  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-zip');
};

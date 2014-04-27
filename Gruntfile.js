/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    markdownpdf: {
      files: {
        src: 'cv/JaysonHarshbarger-CV.md',
        dest: 'cv'
      }
    },

    copy: {
      cv: {
        src: 'cv/JaysonHarshbarger-CV.md',
        dest: 'cv/README.md'
      },
      gh: {
        expand: true,
        cwd: 'cv/',
        src: ['*'],
        dest: 'gh-pages/_includes/'
      }
    },

    'gh-pages': {
      cv: {
        options: {
          base: 'cv',
          branch: 'cv'
        },
        src: '**/*'
      },
      gh: {
        options: {
          base: 'gh-pages',
          branch: 'gh-pages'
        },
        src: '**/*'
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('build:cv', ['markdownpdf','copy:cv']);
  grunt.registerTask('build:gh', ['copy:gh']);
  grunt.registerTask('build', ['build:cv','build:gh']);

  grunt.registerTask('deploy:cv', ['build:cv','gh-pages:cv']);
  grunt.registerTask('deploy:gh', ['build:gh','gh-pages:gh']);
  grunt.registerTask('deploy', ['build','gh-pages']);

};

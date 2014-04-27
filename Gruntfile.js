/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: grunt.file.readJSON('config.json' ),

    // Task configuration.
    markdownpdf: {
      files: {
        src: 'cv/<%= meta.name %>.md',
        dest: 'cv'
      }
    },

    copy: {
      cv: {
        src: 'cv/<%= meta.name %>.md',
        dest: 'cv/README.md'
      },
      gh: {
        expand: true,
        cwd: 'gh-pages/',
        src: ['images/*','stylesheets/*'],
        dest: '.gh-pages'
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
          base: '.gh-pages',
          branch: 'gh-pages'
        },
        src: '**/*'
      }
    },

    assemble: {
      options: {
        meta: '<%= meta %>',
        flatten: true,
        layoutdir: 'gh-pages/_layouts'
      },
      gh: {
        options: {
          layout: 'default.hbs',
        },
        files: {
          '.gh-pages/': ['gh-pages/*.html']
        }
      }
    },

    clean: [".gh-pages/"]

  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble' );

  // Default task.
  grunt.registerTask('build:cv', ['markdownpdf','copy:cv']);
  grunt.registerTask('build:gh', ['copy:gh','assemble:gh']);
  grunt.registerTask('build', ['build:gh']);

  grunt.registerTask('deploy:cv', ['build:cv','gh-pages:cv']);
  grunt.registerTask('deploy:gh', ['build:gh','gh-pages:gh']);
  grunt.registerTask('deploy', ['build','gh-pages']);

  grunt.registerTask('default', ['build']);  

};

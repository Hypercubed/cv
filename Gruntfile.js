/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    config: grunt.file.readJSON('config.json' ),

    // Task configuration.
    markdownpdf: {
      options: {
        cssPath: './../../../../../pdf.css'
      },
      files: {
        src: '<%= config.src %>',
        dest: 'cv'
      }
    },

    copy: {
      cv: {
        src: '<%= config.src %>',
        dest: '<%= config.base %>README.md'
      },
      gh: {
        expand: true,
        cwd: 'gh-pages/',
        src: ['.nojekyll', 'images/*','stylesheets/*'],
        dest: '.gh-pages'
      },
      gh2: {
        expand: true,
        cwd: '<%= config.base %>',
        src: '*',
        dest: '.gh-pages'
      }
    },

    'gh-pages': {
      cv: {
        options: {
          base: '<%= config.base %>',
          branch: 'cv'
        },
        src: '**/*'
      },
      gh: {
        options: {
          base: '.gh-pages',
          branch: 'gh-pages',
          dot: true
        },
        src: '**/*'
      }
    },

    assemble: {
      options: {
        config: '<%= config %>',
        flatten: true,
        layoutdir: 'gh-pages/_layouts'
      },
      gh: {
        options: {
          layout: 'default.hbs'
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
  grunt.registerTask('build:gh', ['clean', 'copy:gh','build:cv','copy:gh2','assemble:gh']);
  grunt.registerTask('build', ['build:gh']);

  grunt.registerTask('deploy:cv', ['build:cv','gh-pages:cv']);
  grunt.registerTask('deploy:gh', ['build:gh','gh-pages:gh']);
  grunt.registerTask('deploy', ['build','gh-pages']);

  grunt.registerTask('default', ['build']);

};

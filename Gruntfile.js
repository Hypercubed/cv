/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    markdownpdf: {
      files: {
        src: "cv/README.md",
        dest: "cv"
      }
    },

    rename: {
      pdf: {
        src: 'cv/README.pdf',
        dest: 'cv/JaysonHarshbarger-CV.pdf'
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['markdownpdf','rename']);

};

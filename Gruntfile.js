module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      model: {
        src: [
          'model/*.js'
        ],
        dest: 'dist/models.js'
      }
    },
    less: {
      dist: {
        files: {
          'dist/style.css': 'css/*.less'
        }
      }
    },
    watch: {
      js: {
        files: ['model/*.js'],
        tasks: ['concat:model']
      },
      css: {
        files: ['css/*.less'],
        tasks: ['less']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

};

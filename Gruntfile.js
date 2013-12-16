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
      html: {
        files: ['page.html'],
        tasks: ['htmltojs']
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

  grunt.registerTask('htmltojs', 'Convert html to javascript string', function () {
    var html = grunt.file.read('page.html');

    while (html.search('\n') !== -1) {
      html = html.replace('\n', '');
    }

    var script = "$('body').prepend('" + html + "')";

    grunt.file.write('dist/page.js', script);
  });

};

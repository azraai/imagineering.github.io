module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      production: {
        options: {
          paths: ["bower_components/bootstrap/less"],
          yuicompress: true
        },
        files: {
          "assets/css/app.css": "assets/less/application.less"
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['bower_components/jquery/jquery.js', 'bower_components/bootstrap/dist/js/bootstrap.js', 'assets/js/application.js'],
        dest: 'assets/js/app.js',
      },
    },
    uglify: {
      production: {
        files: {
          "assets/js/app.min.js": "assets/js/app.js"
        }
      }
    },
    cssmin: {
      minify: {
        src: "assets/css/app.css",
        dest: "assets/css/app.min.css"
      }
    },
    copy: {
      bootstrap: {
        files: [
          {expand: true, cwd: 'bower_components/bootstrap/img/', src: ['**'], dest: 'assets/img/'}
        ]
      },
      'font-awesome': {
        files: [
          {expand: true, cwd: 'bower_components/font-awesome/fonts/', src: ['**'], dest: 'assets/fonts/'}
        ]
      },
    },
    exec: {
      build: {
        cmd: 'jekyll build'
      },
      serve: {
        cmd: 'jekyll serve --watch'
      }
    },
    watch: {
      less: {
        files: "**/*.less",
        tasks: ['less']
      },
      js: {
        files: "assets/js/app.js",
        tasks: ['concat', 'uglify']
      },
      css: {
        files: "assets/css/app.css",
        tasks: ['cssmin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', [ 'less', 'concat', 'uglify', 'cssmin', 'copy', 'exec:build' ]);
  grunt.registerTask('deploy', [ 'default', 'exec:deploy' ]);
};

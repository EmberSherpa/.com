'use strict';

module.exports = function(grunt) {

  // load all grunt tasks
  require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9000,
          base: './build'
        }
      }
    },

    wintersmith: {
      build: {
        options: {
          action: "build",
          config: "./config-build.json"
        }
      },
      preview: {
        options: {
          action: "preview",
          config: "./config-preview.json"
        }
      }
    },

    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:9000/tests/index.html'
          ]
        }
      }
    },

    open : {
      tests : {
        path: 'http://localhost:9000/tests',
        app: 'Google Chrome'
      }
    }


  });

  // server
    // wintersmith:preview

  // server:test
    // wintersmith:preview
    // qunit

  // build
    // wintersmith:build

  // build:test
    // wintersmith:build
    // connect:server

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', function( target ) {

    grunt.event.on('qunit.spawn', function (url) {
      grunt.log.ok("Running test: " + url);
    });

    var tasks;
    if ( typeof target === 'undefined' ) {
      tasks = [
        'connect:server',
        'qunit'
      ];
    } else {
      tasks = [
        'open:tests',
        'connect:server:keepalive'
      ];
    }

    grunt.task.run( tasks );
  });

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

};
